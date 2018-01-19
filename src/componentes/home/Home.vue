<template>
  <div>
      <h1 class="centralizado"> {{ titulo }}</h1>
      <p v-show="mensagem" class="centralizado"> {{ mensagem }}</p>
      <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre por parte do titulo">
      <ul class="lista-fotos">
        <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
              <meu-painel :titulo="foto.titulo">
                <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
                <router-link :to="{name : 'altera', params: {id: foto._id} }">
                  <meu-botao tipo="button" rotulo="ALTERAR"></meu-botao>
                </router-link>
                <meu-botao
                  tipo="button"
                  rotulo="REMOVER" 
                  @botaoAtivado="remove(foto)"
                  :confirmacao="true"
                  estilo="perigo">
                </meu-botao>
              </meu-painel>
        </li>
      </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  directives: {
    'meu-transform': transform
  },

  data () {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {

    fotosComFiltro () {
      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else {
        return this.fotos;
      }
    }

  },

  methods: {

      remove(foto) {
        this.service
        .apaga(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = err.message;
          }
        )
    }

  },

  created() {

    this.service = new FotoService(this.$resource);

    this.service.lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
  }
}
</script>

<style lang="scss">

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
