import { prismaClient } from '../utils/prisma';

async function updateExistingItems() {
  try {
    // Atualiza todos os itens para garantir que os novos campos tenham valores padrão
    await prismaClient.item.updateMany({
      data: {
        isTrack: false,  // valor padrão para o campo isTrack
        genero: 'default',  // valor padrão para o campo genero
      },
    });
    console.log('Items updated');
  } catch (error) {
    console.error('Error updating items:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

updateExistingItems();



