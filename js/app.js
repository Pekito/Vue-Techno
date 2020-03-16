const vm = new Vue({
    el: '#app',
    data: {
        produtos: [],
        produto: '',
        carrinho: []
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
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
        fecharModal({target, currentTarget}) {
            this.produto = target === currentTarget ? false : this.produto;
        },
        fetchProdutos() {
            fetch("./api/produtos.json")
            .then(res => res.json())
            .then(data => this.produtos = data)
        },
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
            .then(res => res.json())
            .then(data => this.produto = data)
        },
        adicionarItem() {
            this.produto.estoque--;
            const {id, nome, preco} = this.produto
            this.carrinho.push({
                id, nome, preco
            });
        },
        removerItem(index) {
            this.carrinho.splice(0,)
        }
    },
    created() {
        this.fetchProdutos();
    },
    computed: {
        carrinhoTotal() {
            let total = 0;
            this.carrinho.forEach((el) => total += el.preco);
            return total;
        }
    }
});