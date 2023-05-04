package bgptools

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

var (
	asnNameCache map[int]string
)

func init() {
	asnNameCache = make(map[int]string)
}

func AsnNameInitNetwork(version string) {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://bgp.tools/asns.csv", nil)
	req.Header.Set("User-Agent", fmt.Sprintf("MTR.SB/%s - support@mtr.sb", version))
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	csvReader := csv.NewReader(resp.Body)
	records, err := csvReader.ReadAll()

	for _, record := range records {
		if record[0] == "asn" {
			continue
		}
		asn, err := strconv.Atoi(strings.Replace(record[0], "AS", "", -1))
		if err != nil {
			fmt.Println("error", record[0], err)
			continue
		}
		asnNameCache[asn] = record[1]
	}
}

func Asn2Name(asn int) string {
	if name, ok := asnNameCache[asn]; ok {
		return name
	}
	return "UNKNOWN"
}
