package main

import (
	"fmt"
	"time"
	"github.com/alpacahq/alpaca-trade-api-go/v3/marketdata"
)

func main() {
	// Initialize the Alpaca marketdata client.
	client := marketdata.NewClient(marketdata.ClientOpts{})

	// Create a request to get the crypto bars for the day.
	cryptoRequest := marketdata.GetCryptoBarsRequest{
		Start: time.Date(2026, 8, 30, 0, 0, 0, 0, time.UTC),
	}

	// Create a request to get the stock bars for the day.
	stockRequest := marketdata.GetBarsRequest{
		Start: time.Date(2026, 8, 28, 0, 0, 0, 0, time.UTC),
	}

	// Print the crypto bars of BTC/USD for the day.
	printCryptoRequest(client, cryptoRequest, "BTC/USD")

	// Print the stock bars of GOOGL for the day.
	printStockRequest(client, stockRequest, "GOOGL")
}


func printCryptoRequest(client *marketdata.Client, request marketdata.GetCryptoBarsRequest, symbol string) {
	fmt.Printf("%s:\n", symbol)
	
	if client == nil {
		fmt.Println("No client provided.")
	}

	bars, err := client.GetCryptoBars(symbol, request)
	// If there is an error, print the error and return.
	if err != nil {
		fmt.Printf("[%s] Error getting bars: %v\n", symbol, err)
		return
	}

	// For each bar, print the bar.
	for _, bar := range bars {
		fmt.Printf("%+v\n", bar)
	}
}


func printStockRequest(client *marketdata.Client, request marketdata.GetBarsRequest, symbol string) {
	fmt.Printf("%s:\n", symbol)

	if client == nil {
		fmt.Println("No client provided.")
	}

	bars, err := client.GetBars(symbol, request)
	// If there is an error, print the error and return.
	if err != nil {
		fmt.Printf("[%s] Error getting bars: %v\n", symbol, err)
		return
	}
	if len(bars) == 0 {
    fmt.Printf("No bars returned for %s (market may be closed).\n", symbol)
		return
	}

	// For each bar, print the bar.
	for _, bar := range bars {
		fmt.Printf("%+v\n", bar)
	}
}
