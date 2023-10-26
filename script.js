// console.log("Hello");
// Aqui vamos capturar a fala do usuário



const CapturarFala = () => {
    let botao = document.querySelector('#microfone');
    let input = document.querySelector('input');

    //Aqui vamos criar um objeto de reconhecimento de fala
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;

    

    botao.addEventListener('mousedown', () => {
        botao.classList.add('recording'); // Adiciona a classe quando a gravação inicia
        recognition.start();
    });

    botao.addEventListener('mouseup', () => {
        recognition.stop();
        botao.classList.remove('recording'); // Remove a classe quando a gravação para
        PerguntarAoJarvis(input.value);
    });

    //Aqui vamos recuperar o resultado da fala
    recognition.addEventListener('result', (e) => {
        const result = e.results[0][0].transcript;
        input.value = result;
    });
};

const AtivarJarvis = () => {

    let input = document.querySelector('input');

    // Crie uma instância de SpeechRecognition
    const recognition = new webkitSpeechRecognition();

    // Defina configurações para a instância
    recognition.continuous = true; // Permite que ele continue escutando
    recognition.interimResults = false; // Define para true se quiser resultados parciais

    // Inicie o reconhecimento de voz
    recognition.start();

    // Adicione um evento de escuta para lidar com os resultados
    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1]; // Último resultado

        // Verifique o texto reconhecido
        const recognizedText = result[0].transcript;

        // Verifique se a palavra "Jarvis" está no texto
        if (recognizedText.toLowerCase().includes('jarvis')) {

            // Comece a salvar a pergunta quando "Jarvis" é detectado
            let array_pergunta = recognizedText.toLowerCase().split('jarvis');
            array_pergunta = array_pergunta[array_pergunta.length - 1];

            input.value = array_pergunta;
            PerguntarAoJarvis(array_pergunta);

            // Pare o reconhecimento de voz para economizar recursos
            recognition.stop();
        }
    };

    // Adicione um evento para reiniciar o reconhecimento após um tempo
    recognition.onend = () => {
        setTimeout(() => {
            recognition.start();
        }, 1000); // Espere 1 segundo antes de reiniciar
    };


}






const PerguntarAoJarvis = (pergunta) => {
    let Key = process.env.OPEN_API_KEY

    let url = 'https://api.openai.com/v1/chat/completions';
    let header = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Key
    };

    let body = {
        "model": "ft:gpt-3.5-turbo-0613:zeros-e-um::8DDHyrh4",
        "messages": [
            {
                "role": "system",
                "content": "Jarvis é um chatbot pontual e muito simpático que ajuda as pessoas"
            },
            {
                "role": "user",
                "content": pergunta
            }
        ],
        "temperature": 0.7
    };

    let options = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    };

    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            FalarComJarvis(data.choices[0].message.content);
        });
};

const FalarComJarvis = (textoParaFala) => {
    let Key = process.env.AZURE_API_KEY

    const endpoint = "https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1";

    const requestOptions = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': Key,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
            'User-Agent': 'curl',
        },
        body: `<speak version='1.0' xml:lang='pt-BR'>
                <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-AntonioNeural'>
                    ${textoParaFala}
                </voice>
            </speak>`,
    };

    fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.arrayBuffer();
            } else {
                throw new Error(`Falha na requisição: ${response.status} - ${response.statusText}`);
            }
        })
        .then(data => {
            const blob = new Blob([data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(blob);

            const audioElement = new Audio(audioUrl);
            audioElement.play();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    
};

//CapturarFala();
AtivarJarvis();


// script.js
const darkModeButton = document.getElementById('dark-mode-button');

darkModeButton.addEventListener('click', () => {
    console.log('chegou')
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
});



