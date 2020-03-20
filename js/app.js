const vm = new Vue({
    el: '#app',
    data: {
        produtos: [],
        produto: '',
        carrinho: [],
        mensagemAlerta: 'item Adicionado',
        alertaAtivo: false,
        carrinhoAtivo: false
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
        fecharModalCarrinho({target, currentTarget}) {
            this.carrinhoAtivo = target === currentTarget ? false : this.carrinhoAtivo;

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
            this.alerta(`${nome} foi adicionado ao carrinho`)
        },
        removerItem(index) {
            this.carrinho.splice(index,1)
            this.alerta('Item removido do Carrinho')
        },
        checarLocalStorage() {
            if (window.localStorage.carrinho) this.carrinho = JSON.parse(window.localStorage.carrinho);
        },
        alerta(mensagem) {
            this.mensagemAlerta = mensagem;
            this.alertaAtivo = true;
            setTimeout(() => this.alertaAtivo = false, 1500);
        },
        router() {
            const hash = document.location.hash.split('#')[1];
            if (hash) {
                this.fetchProduto(hash);
            }
        },
        compararEstoque() {
            const items = this.carrinho.filter(({id}) => {
                if (id === this.produto.id) {
                    return true;
                }
            })
            this.produto.estoque = this.produto.estoque - items.length;
        }
    },
    created() {
        this.fetchProdutos();
        this.router();
        this.checarLocalStorage();
    },
    computed: {
        carrinhoTotal() {
            let total = 0;
            this.carrinho.forEach((el) => total += el.preco);
            return total;
        }
    },
    watch: {
        produto(){
            if(this.produto) {
                this.compararEstoque();
            }
            document.title = this.produto.nome || 'Techno';

            const hash = this.produto.id || '';

            history.pushState(null,null, `#${hash}`);
        },
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        },
    }
});