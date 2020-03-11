const vm = new Vue({
    el: '#app',
    data: {
        produtos: []
    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
            .then(res => res.json())
            .then(data => this.produtos = data)
        }
    },
    created() {
        this.fetchProdutos();
    }
});