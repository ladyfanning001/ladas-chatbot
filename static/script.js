// Tunggu sampai semua konten halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen dari HTML
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const themeSwitch = document.getElementById('theme-switch');
    
    // Cek preferensi tema user dari localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set tema saat awal halaman load (dark/light) berdasarkan preferensi user
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeSwitch.checked = true;
    }
    
    // Event untuk ganti tema saat user toggle switch
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark'); // Simpan preferensi
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); // Simpan preferensi
        }
    });
    
    // Fokuskan cursor ke input text saat halaman dibuka
    userInput.focus();
    
    // Fungsi untuk format teks: bold, list, dan paragraph
    function formatText(text) {
        if (!text) return '';
        
        // Escape karakter HTML supaya aman dari XSS
        let formattedText = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // Format teks bold pakai **text** atau __text__
        formattedText = formattedText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>');
        
        // Deteksi list bernomor (1. 2. 3.)
        let inNumberedList = false;
        const numberedListRegex = /^(\d+)\.\s(.*)$/gm;
        
        if (numberedListRegex.test(formattedText)) {
            inNumberedList = true;
            formattedText = '<ol>\n' + formattedText.replace(numberedListRegex, '<li>$2</li>') + '\n</ol>';
        }
        
        // Deteksi bullet list (* item atau - item)
        const bulletListRegex = /^[\*\-]\s(.*)$/gm;
        
        if (bulletListRegex.test(formattedText)) {
            if (!inNumberedList) {
                formattedText = formattedText.replace(bulletListRegex, '<li>$1</li>');
                formattedText = '<ul>\n' + formattedText + '\n</ul>';
            } else {
                formattedText = formattedText.replace(/<\/ol>/, '');
                formattedText = formattedText.replace(bulletListRegex, '<li>$1</li>');
                formattedText += '</ol>';
            }
        }
        
        // Handle paragraf dan line break
        if (!inNumberedList) {
            const paragraphs = formattedText.split(/\n\s*\n/);
            formattedText = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
            
            // Ganti line break dalam paragraf jadi <br>
            formattedText = formattedText.replace(/<p>(.*?)\n(.*?)<\/p>/gs, '<p>$1<br>$2</p>');
        }
        
        return formattedText;
    }
    
    // Fungsi untuk menambahkan pesan baru ke chat box
    function addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        
        // Avatar (gambar bot atau teks "You" buat user)
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (isUser) {
            avatar.textContent = 'You'; // Kalau user, teks "You"
        } else {
            const avatarImg = document.createElement('img');
            avatarImg.src = '/static/chillpal-avatar.png';
            avatarImg.alt = 'ChillPal';
            avatarImg.className = 'avatar-image';
            avatar.appendChild(avatarImg); // Kalau bot, gambar avatar
        }
        
        // Bubble chat (isi pesan)
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        if (isUser) {
            const text = document.createElement('p');
            text.textContent = content;
            bubble.appendChild(text);
        } else {
            const formattedContent = formatText(content);
            bubble.innerHTML = formattedContent;
        }
        
        // Gabungkan avatar + bubble ke message
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
        
        // Tambahkan ke chat box
        chatBox.appendChild(messageDiv);
        
        // Scroll otomatis ke bawah
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fungsi buat menampilkan typing indicator (bot lagi ngetik)
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing-container';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.src = '/static/chillpal-avatar.png';
        avatarImg.alt = 'ChillPal';
        avatarImg.className = 'avatar-image';
        avatar.appendChild(avatarImg);
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        
        // Bikin 3 titik animasi ngetik
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            indicator.appendChild(dot);
        }
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Fungsi untuk hapus typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Fungsi untuk kirim pesan user
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== "") {
            // Tampilkan pesan user
            addMessage(message, true);
            userInput.value = "";
            
            // Tampilkan typing indicator
            showTypingIndicator();
            
            // Kirim pesan ke server backend
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: message })
            })
            .then(response => response.json())
            .then(data => {
                // Hapus typing indicator
                removeTypingIndicator();
                
                // Tampilkan jawaban bot dengan delay kecil
                setTimeout(() => {
                    addMessage(data.response, false);
                }, 300);
            })
            .catch(error => {
                console.error('Error:', error);
                removeTypingIndicator();
                addMessage("Maaf, sepertinya ada masalah dengan koneksi. Coba lagi ya!", false);
            });
        }
    }
    
    // Event klik tombol send
    sendBtn.addEventListener('click', sendMessage);
    
    // Event tekan Enter di input
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Animasi bintang di background
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        setInterval(() => {
            const size = Math.random() * 4 + 2; // Ukuran random bintang
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = '0';
            
            setTimeout(() => {
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                setTimeout(() => {
                    star.style.opacity = '0.8';
                }, 100);
            }, 100);
        }, Math.random() * 5000 + 5000); // Durasi random
    });
    
    //ngerubahan tema dari sistem
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-theme');
                themeSwitch.checked = true;
            } else {
                document.body.classList.remove('dark-theme');
                themeSwitch.checked = false;
            }
        }
    });
});
