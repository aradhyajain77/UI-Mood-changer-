  // 1. Initial Load
        let entries = JSON.parse(localStorage.getItem('debugMoods')) || [];
        console.log("Loaded entries:", entries);
        render();

        function addEntry() {
            const text = document.getElementById('entryText').value;
            const mood = document.getElementById('moodSelect').value;

            if(!text.trim()) return alert("Type something!");

            const entry = { id: Date.now(), mood, text };
            const timeString = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            entry.date = timeString;

            entries.unshift(entry);
            
            localStorage.setItem('debugMoods', JSON.stringify(entries));
            document.getElementById('entryText').value = "";
            console.log("Added new entry:", entry);
            render();
        }

        function deleteEntry(id) {
            entries = entries.filter(e => e.id !== id);
            localStorage.setItem('debugMoods', JSON.stringify(entries));
            render();
        }

        function changeMood(m) {
            console.log("Changing filter to:", m);
            document.body.className = m;
            const filtered = (m === 'all') ? entries : entries.filter(e => e.mood === m);
            render(filtered);
        }

        function render(data = entries) {
            const area = document.getElementById('list');
            area.innerHTML = "";
            
            data.forEach(item => {
                area.innerHTML += `
                    <div class="card">
                        <button class="del-btn" onclick="deleteEntry(${item.id})">×</button>
                        <strong>${item.mood.toUpperCase()}</strong>
                        <small>${item.date}</small>
                        <p>${item.text}</p>
                    </div>
                `;
            });
        }