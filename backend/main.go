package main

import (
	"fmt"
	"net/http"
)

func handlerRaiz(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Olá, mundo! O servidor Go está no ar.")
}

func main() {
	http.HandleFunc("/", handlerRaiz)

	fmt.Println("Servidor rodando em http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}