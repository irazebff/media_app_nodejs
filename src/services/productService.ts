import axios from 'axios';

const wordpressBaseUrl = 'https://fatsus.com.br/wp-json/wp/v2';

export async function getPosts() {
  try {
    const response = await axios.get(`${wordpressBaseUrl}/posts`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao buscar produtos:', error.message);
    } else {
      console.error('Erro ao buscar produtos:', error);
    }
    throw new Error('Erro ao buscar produtos');
  }
}
