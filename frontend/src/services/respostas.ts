export function gerarResposta(pergunta: string): string {

    const texto = pergunta.toLowerCase();

    // Saudações
    if (texto.includes('oi') || texto.includes('olá') || texto.includes('ola')) {
        return 'Olá! 😊 Como você está hoje?';
    }

    if (texto.includes('bom dia')) {
        return 'Bom dia! ☀️ Espero que seu dia seja maravilhoso!';
    }

    if (texto.includes('boa tarde')) {
        return 'Boa tarde! 💙 Como posso ajudar você?';
    }

    if (texto.includes('boa noite')) {
        return 'Boa noite! 🌙 Desejo que você tenha uma noite tranquila.';
    }

    // Cansaço
    if (
        texto.includes('cansado') ||
        texto.includes('cansada') ||
        texto.includes('sono')
    ) {
        return `Poxa... 😔

O cansaço pode acontecer por vários motivos.

Procure descansar um pouco, beber bastante água e evitar esforços excessivos.

Se isso estiver acontecendo há vários dias, vale procurar um profissional de saúde. 💙`;
    }

    return `Entendi. 😊

Pode me contar um pouco mais?

Estou aqui para conversar com você. 💙`;

}