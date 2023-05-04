package bgptools

import (
	"bufio"
	"fmt"
	"github.com/praserx/ipconv"
	"math/big"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type v4DataFormat struct {
	Start uint32
	End   uint32
	Asn   int
}

type v6DataFormat struct {
	Start *big.Int
	End   *big.Int
	Asn   int
}

var (
	v4Cache []*v4DataFormat
	v6Cache []*v6DataFormat
)

func parse(scanner *bufio.Scanner) {
	for scanner.Scan() {
		splitEd := strings.Split(scanner.Text(), " ")
		asn, err := strconv.Atoi(splitEd[1])
		if err != nil {
			panic(err)
		}
		cidr, ipNet, err := net.ParseCIDR(splitEd[0])
		if err != nil {
			panic(err)
		}

		if strings.Contains(splitEd[0], ".") {
			start, err := ipconv.IPv4ToInt(cidr)
			if err != nil {
				panic(err)
			}
			end, err := ipconv.IPv4ToInt(getLastIP(ipNet))
			if err != nil {
				panic(err)
			}
			data := v4DataFormat{
				Start: start,
				End:   end,
				Asn:   asn,
			}
			v4Cache = append(v4Cache, &data)
		} else {
			start, err := ipconv.IPv6ToBigInt(cidr)
			if err != nil {
				panic(err)
			}
			end, err := ipconv.IPv6ToBigInt(getLastIP(ipNet))
			if err != nil {
				panic(err)
			}
			data := v6DataFormat{
				Start: start,
				End:   end,
				Asn:   asn,
			}
			v6Cache = append(v6Cache, &data)
		}

	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}

func InitLocal(path string) {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	parse(scanner)
}

func InitNetwork(version string) {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://bgp.tools/table.txt", nil)
	req.Header.Set("User-Agent", fmt.Sprintf("MTR.SB/%s - support@mtr.sb", version))
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	scanner := bufio.NewScanner(resp.Body)
	parse(scanner)
}

func Ip2Asn(ip string) int {
	ipNet := net.ParseIP(ip)
	asn := 0
	if strings.Contains(ip, ".") {
		ipNumber, err := ipconv.IPv4ToInt(ipNet)
		if err != nil {
			return -1
		}
		for _, each := range v4Cache {
			if each.Start <= ipNumber && each.End >= ipNumber {
				asn = each.Asn
			} else if each.Start > ipNumber && asn != 0 {
				return asn
			}
		}
	} else {
		ipNumber, err := ipconv.IPv6ToBigInt(ipNet)
		if err != nil {
			return -1
		}
		for _, each := range v6Cache {
			if (each.Start.Cmp(ipNumber) == -1 || each.Start.Cmp(ipNumber) == 0) &&
				(each.End.Cmp(ipNumber) == 1 || each.End.Cmp(ipNumber) == 0) {
				asn = each.Asn
			} else if each.Start.Cmp(ipNumber) == 1 && asn != 0 {
				return asn
			}
		}
	}
	return asn
}

func getLastIP(ipNet *net.IPNet) net.IP {
	ip := ipNet.IP
	lastIP := make(net.IP, len(ip))
	copy(lastIP, ip)

	ones, bits := ipNet.Mask.Size()
	for i := ones; i < bits; i++ {
		lastIP[i/8] |= 1 << (7 - uint(i%8))
	}

	return lastIP
}
