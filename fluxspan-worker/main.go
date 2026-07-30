package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("FluxSpan Go Worker started successfully!")
	
	for {
		time.Sleep(10 * time.Second)
		fmt.Println("Worker heartbeat...")
	}
}
