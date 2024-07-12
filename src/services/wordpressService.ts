import axios from 'axios';

const wordpressBaseUrl = 'https://fatsus.com.br/wp-json/wp/v2';

export async function getPosts() {
  try {
    const response = await axios.get(`${wordpressBaseUrl}/posts`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar posts:', error.message);
    } else {
      console.error('Erro ao buscar posts:', error);
    }
    throw new Error('Erro ao buscar posts');
  }
}

// Adicionando uma função para buscar eventos, assumindo que eventos são representados por posts com uma categoria específica.
export async function getEvents() {
  try {
    // Ajuste o filtro de categoria conforme necessário
    const response = await axios.get(`${wordpressBaseUrl}/posts?categories=EVENT_CATEGORY_ID`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar eventos:', error.message);
    } else {
      console.error('Erro ao buscar eventos:', error);
    }
    throw new Error('Erro ao buscar eventos');
  }
}
