package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Projeto struct {
	ID          int      `json:"id"`
	Nome        string   `json:"nome"`
	Descricao   string   `json:"descricao"`
	Tecnologias []string `json:"tecnologias"`
	Imagem      string   `json:"imagem"`
	GitHub      string   `json:"github"`
	Acessar     string   `json:"acessar"`
}

var projetos = []Projeto{
	{
		ID:          1,
		Nome:        "Hospedador de Links",
		Descricao:   "Agregador de links para usar como cartão de visitas online.",
		Tecnologias: []string{"HTML", "CSS", "JavaScript", "Figma"},
		Imagem:      "preview-hospedador-links.png",
		GitHub:      "https://github.com/lucasalves0722/Hospedador-de-links",
		Acessar:     "https://lojatikvah.com.br",
	},
	{
		ID:          2,
		Nome:        "BalleCoffee",
		Descricao:   "Plataforma de receitas de café, com foco em layout limpo.",
		Tecnologias: []string{"HTML5", "CSS"},
		Imagem:      "preview-ballecoffee.png",
		GitHub:      "https://github.com/lucasalves0722/DASHBOARD",
		Acessar:     "https://lucasalves0722.github.io/DASHBOARD/",
	},
	{
		ID:          3,
		Nome:        "Clone do Tinder",
		Descricao:   "Clone responsivo da interface do Tinder, para praticar HTML e CSS.",
		Tecnologias: []string{"HTML5", "CSS"},
		Imagem:      "preview-clone-tinder.png",
		GitHub:      "https://github.com/lucasalves0722/Clone-Tinder-",
		Acessar:     "https://lucasalves0722.github.io/Clone-Tinder-/",
	},
}

func handlerRaiz(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Olá, mundo! O servidor Go está no ar.")
}

func handlerProjetos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projetos)
}

func main() {
	http.HandleFunc("/", handlerRaiz)
	http.HandleFunc("/api/projetos", handlerProjetos)

	fmt.Println("Servidor rodando em http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}