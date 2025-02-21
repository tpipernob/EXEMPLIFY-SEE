<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <div class="text-h6">Cadastrar Novo Exemplo</div>

      <q-form @submit.prevent="salvarExemplo">
        <!-- Título do Exemplo -->
        <q-input v-model="exemplo.titulo" label="Título do Exemplo" required class="q-mb-md" />

        <!-- Tipo do Exemplo -->
        <q-select
          v-model="exemplo.tipo"
          :options="tiposExemplo"
          label="Tipo de Exemplo"
          class="q-mb-md"
          required
        />

        <!-- Modelos UMLS -->
        <q-select
          v-model="exemplo.modelo"
          :options="modelosUML"
          label="Modelos UML (Opcional)"
          multiple
          use-chips
          hint="Caso não se aplique, deixe em branco."
          class="q-mb-md"
        />

        <!-- Descrição do Exemplo -->
        <q-input
          v-model="exemplo.descricao"
          label="Descrição do Exemplo"
          type="textarea"
          required
          class="q-mb-md"
        />

        <!-- Fonte do Exemplo -->
        <q-input
          v-model="exemplo.fonte"
          label="Fonte do Exemplo"
          hint="Insira um link ou a referência do material."
          class="q-mb-md"
        />

        <!-- Link de Referência -->
        <q-input
          v-model="exemplo.link"
          label="Link para o exemplo"
          hint="Forneça um link válido. O material será analisado e, se aprovado, será baixado e integrado ao repositório do projeto."
          required
          class="q-mb-md"
        />

        <!-- Botão de Salvar -->
        <q-btn type="submit" color="primary" label="Salvar Exemplo" class="full-width" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { adicionarExemplo } from '../../firebase/firebase-repositorio'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    const exemplo = ref({
      titulo: '',
      tipo: '',
      modelo: [],
      descricao: '',
      fonte: '',
      link: '',
      aprovado: false // 🔹 Sempre começa como "false"
    })

    const tiposExemplo = ['Exemplo Correto', 'Exemplo Errôneo', 'Ambos']
    const modelosUML = [
      'Diagrama de Classes',
      'Diagrama de Objetos',
      'Diagrama de Componentes',
      'Diagrama de Pacotes',
      'Diagrama de Estrutura Composta',
      'Diagrama de Implantação (Deployment)',
      'Diagrama de Caso de Uso',
      'Diagrama de Sequência',
      'Diagrama de Comunicação',
      'Diagrama de Estados (State Machine)',
      'Diagrama de Atividades',
      'Diagrama de Interação Geral (Interaction Overview)',
      'Diagrama de Tempo (Timing Diagram)'
    ]

    const salvarExemplo = async () => {
      try {
        await adicionarExemplo(exemplo.value)
        $q.notify({ type: 'positive', message: 'Exemplo cadastrado com sucesso!' })
        // 🔹 Resetar os campos após salvar
        exemplo.value = {
          titulo: '',
          tipo: '',
          modelo: [],
          descricao: '',
          fonte: '',
          link: '',
          aprovado: false // Mantém como "false" por padrão
        }
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao salvar exemplo.' })
      }
    }

    return {
      exemplo,
      tiposExemplo,
      modelosUML,
      salvarExemplo
    }
  }
}
</script>
