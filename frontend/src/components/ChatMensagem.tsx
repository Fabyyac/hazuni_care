import type { Mensagem } from "../types/mensagem";

interface Props {
    mensagem: Mensagem;
}

export default function ChatMensagem({ mensagem }: Props) {

    return (

        <div
            style={{
                alignSelf:
                    mensagem.tipo === 'usuario'
                        ? 'flex-end'
                        : 'flex-start',

                background:
                    mensagem.tipo === 'usuario'
                        ? '#2563EB'
                        : '#FFFFFF',

                color:
                    mensagem.tipo === 'usuario'
                        ? '#FFFFFF'
                        : '#000000',

                padding: 16,

                borderRadius: 15,

                maxWidth: '70%',

                border:
                    mensagem.tipo === 'assistente'
                        ? '1px solid #E2E8F0'
                        : 'none'
            }}
        >

            <p
                style={{
                    margin: 0,
                    whiteSpace: 'pre-line'
                }}
            >
                {mensagem.texto}
            </p>

        </div>

    );

}