export const codeLanguageMap = {
  eth: `package main
import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)
func main() {
	var data = \`{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":2}\`
	request, err := http.NewRequest("POST", "https://ethereum-mainnet.ey-node.com/api/v1/gateway/rpc", strings.NewReader(data))
	if err != nil {
		fmt.Printf("new request error %s\\n", err)
		return
	}
	defer request.Body.Close()
	request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	//HTTP basic authentication with your ethereum project id and secret
	request.SetBasicAuth("1P4Z8NK2YxyBIvJkGe", "np6gKvZwMh8YBW1yl015f8duuifv4ULkOMXY")
	client := http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		fmt.Printf("POST request error %s\\n", err)
		return
	}
	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("read response error %s\\n", err)
		return
	}
	fmt.Printf("%s\\n", string(respBytes))
}
	
/*
	$ go run main.go
	{"jsonrpc":"2.0","id":2,"result":"0xe5a51a"}
*/`,
  near: `package main
import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)
func main() {
	var data = \`{"jsonrpc": "2.0",  "id": 1,  "method": "gas_price",  "params": [17824600]}\`
	request, err := http.NewRequest("POST", "https://near-mainnet.ey-node.com/api/v1/gateway/rpc", strings.NewReader(data))
	if err != nil {
		fmt.Printf("new request error %s\\n", err)
		return
	}
	defer request.Body.Close()
	request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	//HTTP basic authentication with your near project id and secret
	request.SetBasicAuth("BpXmxvtoq0aXix1dnA", "JejZEvuFca1JGaVOAWloceKNoKGVgj5uol4E")
	client := http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		fmt.Printf("POST request error %s\\n", err)
		return
	}
	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("read response error %s\\n", err)
		return
	}
	fmt.Printf("%s\\n", string(respBytes))
}

/*
	$ go run main.go
	{"jsonrpc":"2.0","result":{"gas_price":"100000000"},"id":1}
*/`,
  filecoin: `package main
import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)
func main() {
	var data = \`{"jsonrpc":"2.0", "method":"Filecoin.WalletBalance", "params":["f01234"], "id":2}\`
	request, err := http.NewRequest("POST", "https://filecoin-mainnet.ey-node.com/api/v1/gateway/rpc", strings.NewReader(data))
	if err != nil {
		fmt.Printf("new request error %s\\n", err)
		return
	}
	defer request.Body.Close()
	request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	//HTTP basic authentication with your filecoin project id and secret
	request.SetBasicAuth("FKdWVHrwsRC0TyXUfM", "YaGlgVFrMFmghgEqbBOLLOOCnJZtfMXKMFuh")
	client := http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		fmt.Printf("POST request error %s\\n", err)
		return
	}
	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("read response error %s\\n", err)
		return
	}
	fmt.Printf("%s\\n", string(respBytes))
}

/*
	$ go run main.go
	{"jsonrpc":"2.0","result":"8822743864097655989863","id":2}
*/`
}
