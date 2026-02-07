document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and Inject Clean CSS
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        #chatbot-widget {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            font-family: 'Inter', sans-serif;
        }

        /* Toggle Button - Clean & Modern */
        #chatbot-toggle {
            width: 56px;
            height: 56px;
            background: #2563eb; /* Solid Blue */
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease, background 0.2s;
        }
        
        #chatbot-toggle:hover {
            transform: scale(1.05);
            background: #1d4ed8;
        }

        /* Chat Window - Minimalist */
        #chatbot-window {
            position: absolute;
            bottom: 50px; /* Adjusted to prevent overlap */
            right: 0;
            width: 360px;
            height: 550px;
            max-width: 90vw;
            max-height: calc(100vh - 120px);
            background: #1e1e1e; /* Dark Gray */
            border: 1px solid #333;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform-origin: bottom right;
            transform: scale(0.95);
            opacity: 0;
            pointer-events: none;
            transition: all 0.2s ease-out;
        }
        
        #chatbot-window.open {
            transform: scale(1);
            opacity: 1;
            pointer-events: all;
        }
        
        /* Header */
        .chat-header {
            padding: 16px;
            background: #252525;
            border-bottom: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .header-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .bot-avatar {
            width: 32px;
            height: 32px;
            background: #2563eb;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }

        .chat-header h4 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #fff;
        }
        
        .chat-header p {
            margin: 0;
            font-size: 11px;
            color: #888;
        }
        
        #close-chat {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            padding: 4px;
        }
        
        #close-chat:hover {
            color: #fff;
        }

        /* Messages */
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #1e1e1e;
        }
        
        .message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        
        .message.bot {
            align-self: flex-start;
            background: #2d2d2d;
            color: #e5e5e5;
            border-bottom-left-radius: 2px;
        }
        
        .message.user {
            align-self: flex-end;
            background: #2563eb;
            color: white;
            border-bottom-right-radius: 2px;
        }

        .message.bot a { color: #60a5fa; }
        .message pre { background: #111; padding: 8px; border-radius: 6px; overflow-x: auto; }

        /* Suggestion Chips */
        .suggestions-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 4px;
        }
        
        .suggestion-chip {
            background: rgba(37, 99, 235, 0.15);
            border: 1px solid rgba(37, 99, 235, 0.4);
            color: #93c5fd;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }
        
        .suggestion-chip:hover {
            background: rgba(37, 99, 235, 0.3);
            border-color: #60a5fa;
            transform: translateY(-1px);
        }

        /* Input Area */
        .chat-input-area {
            padding: 16px;
            border-top: 1px solid #333;
            background: #252525;
            display: flex;
            gap: 10px;
        }
        
        #chat-input {
            flex: 1;
            background: #1e1e1e;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 10px 12px;
            color: white;
            outline: none;
            font-family: inherit;
            font-size: 14px;
        }
        
        #chat-input:focus {
            border-color: #2563eb;
        }
        
        #chat-send {
            background: #2563eb;
            border: none;
            border-radius: 8px;
            width: 40px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #chat-send:hover {
            background: #1d4ed8;
        }

        /* Typing Indicator */
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 8px 12px;
            background: #2d2d2d;
            border-radius: 10px;
            width: fit-content;
        }
        
        .dot {
            width: 6px;
            height: 6px;
            background: #888;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 2. HTML Structure
    const widget = document.createElement('div');
    widget.id = 'chatbot-widget';
    widget.innerHTML = `
        <div id="chatbot-window">
             <div class="chat-header">
                <div class="header-info">
                    <div class="bot-avatar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h4>Farhan Kamil Hermansyah (Farmil)</h4>
                        <p>Ask me anything!</p>
                    </div>
                </div>
                <button id="close-chat">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Halo! 👋 Saya asisten virtual Farhan Kamil Hermansyah (Farmil). Ada yg bisa saya bantu?
                </div>
                <!-- Initial Suggestions -->
                <div class="suggestions-container">
                    <div class="suggestion-chip">Siapa Farmil?</div>
                    <div class="suggestion-chip">Skill apa saja?</div>
                    <div class="suggestion-chip">Lihat Portfolio</div>
                    <div class="suggestion-chip">Kontak</div>
                </div>
            </div>
            
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Tulis pesan..." autocomplete="off">
                <button id="chat-send">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
        
        <div id="chatbot-toggle">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </div>
    `;
    document.body.appendChild(widget);

    // 3. Logic
    const toggle = document.getElementById('chatbot-toggle');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-chat');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesContainer = document.getElementById('chat-messages');

    let isOpen = false;

    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            windowEl.classList.add('open');
            toggle.style.transform = 'scale(0)';
            setTimeout(() => input.focus(), 100);
        } else {
            windowEl.classList.remove('open');
            toggle.style.transform = 'scale(1)';
        }
    }

    toggle.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Handle Suggestions Click
    messagesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-chip')) {
            const text = e.target.textContent;
            input.value = text;
            sendMessage();
        }
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        input.value = '';

        const loadingId = appendLoading();
        scrollToBottom();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await response.json();
            document.getElementById(loadingId).remove();

            if (data.reply) {
                const content = (typeof marked !== 'undefined') ? marked.parse(data.reply) : data.reply;
                appendMessage(content, 'bot', true);
            } else {
                appendMessage("Maaf, ada gangguan teknis.", 'bot');
            }
        } catch (error) {
            document.getElementById(loadingId)?.remove();
            appendMessage("Gagal terhubung ke server.", 'bot');
        }

        scrollToBottom();
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, sender, isHtml = false) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        if (isHtml) div.innerHTML = text;
        else div.textContent = text;
        messagesContainer.appendChild(div);
    }

    function appendLoading() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message bot typing-indicator';
        div.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
        messagesContainer.appendChild(div);
        return id;
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
