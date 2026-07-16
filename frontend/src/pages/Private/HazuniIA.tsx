import { useState, useRef, useEffect } from 'react';
import Cabecalho from '../../components/Cabecalho';
import ChatMensagem from '../../components/ChatMensagem';
import { gerarResposta } from '../../services/respostas';
import type { Mensagem } from '../../types/mensagem';

export default function HazuniIA() {

    // Mensagem digitada
    const [mensagem, setMensagem] = useState('');

    // Indica quando a Hazuni está "digitando"
    const [digitando, setDigitando] = useState(false);

    // Lista da conversa
    const [conversa, setConversa] = useState<Mensagem[]>([
        {
            tipo: 'assistente',
            texto:
                'Olá! 😊 Eu sou a Hazuni IA.\n\nEstou aqui para conversar com você e ajudar da melhor forma possível. 💙'
        }
    ]);

    // Referência para rolar a conversa automaticamente
    const fimConversa = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fimConversa.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [conversa, digitando]);

    function enviarMensagem(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        if (!mensagem.trim()) return;

        const texto = mensagem.trim();

        const mensagemUsuario: Mensagem = {
            tipo: 'usuario',
            texto
        };

        // Mostra a mensagem do usuário
        setConversa((antiga) => [...antiga, mensagemUsuario]);

        setMensagem('');

        setDigitando(true);

        // Simula tempo de resposta
        setTimeout(() => {

            const resposta = gerarResposta(texto);

            const mensagemIA: Mensagem = {
                tipo: 'assistente',
                texto: resposta
            };

            setConversa((antiga) => [
                ...antiga,
                mensagemIA
            ]);

            setDigitando(false);

        }, 900);

    }

    return (

        <div style={estilos.tela}>

            <Cabecalho />

            <main style={estilos.chat}>

                {conversa.map((msg, index) => (

                    <ChatMensagem
                        key={index}
                        mensagem={msg}
                    />

                ))}

                {digitando && (

                    <div style={estilos.digitando}>

                        Hazuni está digitando...

                    </div>

                )}

                <div ref={fimConversa} />

            </main>

            <footer style={estilos.rodape}>

                <form
                    onSubmit={enviarMensagem}
                    style={estilos.formulario}
                >

                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChange={(e) =>
                            setMensagem(e.target.value)
                        }
                        style={estilos.input}
                    />

                    <button
                        type="submit"
                        style={estilos.botao}
                    >
                        Enviar
                    </button>

                </form>

            </footer>

        </div>

    );

}

const estilos = {

    tela: {

        height: '100vh',

        display: 'flex',

        flexDirection: 'column' as const,

        background: '#F8FAFC'

    },

    chat: {

        flex: 1,

        display: 'flex',

        flexDirection: 'column' as const,

        gap: 15,

        padding: 20,

        overflowY: 'auto' as const,

        maxWidth: 900,

        width: '100%',

        margin: '0 auto'

    },

    rodape: {

        borderTop: '1px solid #DDD',

        background: 'white',

        padding: 20

    },

    formulario: {

        display: 'flex',

        gap: 10,

        maxWidth: 900,

        margin: '0 auto'

    },

    input: {

        flex: 1,

        padding: 15,

        borderRadius: 10,

        border: '1px solid #CCC',

        fontSize: 16

    },

    botao: {

        background: '#2563EB',

        color: 'white',

        border: 'none',

        borderRadius: 10,

        padding: '15px 25px',

        cursor: 'pointer',

        fontWeight: 'bold' as const

    },

    digitando: {

        background: '#FFF',

        border: '1px solid #DDD',

        padding: 12,

        borderRadius: 12,

        width: 'fit-content',

        color: '#666',

        fontStyle: 'italic'

    }

};