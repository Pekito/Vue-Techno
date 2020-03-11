const vm = new Vue({
    el: '#app',
    data: {
        produtos: [],
        produto: '',
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        }
    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
            .then(res => res.json())
            .then(data => this.produtos = data)
        },
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
            .then(res => res.json())
            .then(data => this.produto = data)
        }
    },
    created() {
        this.fetchProdutos();
    }
});