class FoodWheel {
    constructor() {
        this.foods = ['Pizza', 'Hambúrguer', 'Sushi', 'Tacos', 'Lasanha', 'Salada'];
        this.history = JSON.parse(localStorage.getItem('foodHistory')) || [];
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isSpinning = false;
        // Começamos com rotação que coloca o primeiro item no topo
        this.currentRotation = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFoodsFromStorage();
        this.drawWheel();
        this.updateFoodList();
        this.updateHistory();
        this.updateStats();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            setTimeout(() => this.drawWheel(), 100);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.drawWheel(), 300);
        });
    }

    setupEventListeners() {
        // Navegação entre abas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Botão de girar
        document.getElementById('spinBtn').addEventListener('click', () => {
            this.spin();
        });

        // Adicionar comida
        document.getElementById('addFoodBtn').addEventListener('click', () => {
            this.addFood();
        });

        // Enter para adicionar comida
        document.getElementById('newFood').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addFood();
            }
        });

        // Limpar histórico
        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearHistory();
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Update content based on tab
        if (tabName === 'historico') {
            this.updateHistory();
        } else if (tabName === 'estatisticas') {
            this.updateStats();
        }
    }

    loadFoodsFromStorage() {
        const savedFoods = localStorage.getItem('foods');
        if (savedFoods) {
            this.foods = JSON.parse(savedFoods);
        }
    }

    saveFoodsToStorage() {
        localStorage.setItem('foods', JSON.stringify(this.foods));
    }

    drawWheel() {
        // Make canvas responsive
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth - 40, 400);
        this.canvas.width = size;
        this.canvas.height = size;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = (size / 2) - 20;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.foods.length === 0) {
            this.ctx.fillStyle = '#e2e8f0';
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.fillStyle = '#718096';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Adicione comidas', centerX, centerY);
            return;
        }

        const anglePerSlice = (2 * Math.PI) / this.foods.length;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];

        // LÓGICA SUPER SIMPLES:
        // Começamos do topo (-π/2) e distribuímos os segmentos
        // O primeiro segmento (index 0) tem seu MEIO no topo
        const startOffset = -Math.PI / 2 - (anglePerSlice / 2);

        this.foods.forEach((food, index) => {
            // Ângulo inicial de cada segmento
            const segmentStart = startOffset + (index * anglePerSlice) + this.currentRotation;
            const segmentEnd = segmentStart + anglePerSlice;
            
            // Draw slice
            this.ctx.fillStyle = colors[index % colors.length];
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, segmentStart, segmentEnd);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw text
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            
            // Ângulo do meio do segmento para o texto
            const textAngle = segmentStart + (anglePerSlice / 2);
            this.ctx.rotate(textAngle);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 1;
            
            // Font size responsivo
            const baseFontSize = Math.max(10, Math.min(16, radius / Math.max(8, this.foods.length * 0.8)));
            this.ctx.font = `bold ${baseFontSize}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Truncar texto longo
            let displayText = food;
            const maxLength = Math.max(6, Math.floor(20 - this.foods.length * 0.5));
            if (displayText.length > maxLength) {
                displayText = displayText.substring(0, maxLength - 3) + '...';
            }
            
            // Posição do texto
            const textRadius = radius * Math.max(0.5, 0.75 - (this.foods.length * 0.01));
            
            // Desenhar texto
            this.ctx.strokeText(displayText, textRadius, 0);
            this.ctx.fillText(displayText, textRadius, 0);
            
            this.ctx.restore();
        });
    }

    spin() {
        if (this.isSpinning || this.foods.length === 0) return;
        
        this.isSpinning = true;
        document.getElementById('spinBtn').disabled = true;
        document.getElementById('result').textContent = '';
        
        const spins = 5 + Math.random() * 5; // 5-10 voltas
        const finalRotation = spins * 2 * Math.PI + Math.random() * 2 * Math.PI;
        
        this.animateWheel(finalRotation);
    }

    animateWheel(targetRotation) {
        const startRotation = this.currentRotation;
        const startTime = Date.now();
        const duration = 3000; // 3 segundos
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + targetRotation * easeOut;
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.finishSpin();
            }
        };
        
        animate();
    }

    finishSpin() {
        const anglePerSlice = (2 * Math.PI) / this.foods.length;
        
        // LÓGICA SUPER SIMPLES:
        // A seta aponta para -π/2 (topo)
        // Calculamos qual segmento tem seu MEIO mais próximo do topo
        
        // Normalizar rotação atual
        let normalizedRotation = this.currentRotation % (2 * Math.PI);
        if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI;
        
        // Offset usado no desenho
        const startOffset = -Math.PI / 2 - (anglePerSlice / 2);
        
        // Para cada segmento, calculamos onde está seu meio
        let selectedIndex = 0;
        let minDistance = Infinity;
        
        for (let i = 0; i < this.foods.length; i++) {
            // Ângulo do meio deste segmento
            let segmentMiddle = startOffset + (i * anglePerSlice) + normalizedRotation + (anglePerSlice / 2);
            
            // Normalizar
            segmentMiddle = segmentMiddle % (2 * Math.PI);
            if (segmentMiddle < 0) segmentMiddle += 2 * Math.PI;
            
            // Distância até a seta (-π/2, que normalizado é 3π/2)
            const setaPosition = 3 * Math.PI / 2; // -π/2 normalizado
            let distance = Math.abs(segmentMiddle - setaPosition);
            
            // Considerar a distância circular (menor caminho)
            if (distance > Math.PI) {
                distance = 2 * Math.PI - distance;
            }
            
            if (distance < minDistance) {
                minDistance = distance;
                selectedIndex = i;
            }
        }
        
        const selectedFood = this.foods[selectedIndex];
        
        // Show result
        document.getElementById('result').textContent = `🎉 ${selectedFood}!`;
        
        // Add to history
        this.addToHistory(selectedFood);
        
        // Reset spinning state
        this.isSpinning = false;
        document.getElementById('spinBtn').disabled = false;
    }

    addFood() {
        const input = document.getElementById('newFood');
        const foodName = input.value.trim();
        
        if (foodName && !this.foods.includes(foodName)) {
            // Limite máximo de 20 itens
            if (this.foods.length >= 20) {
                alert('Máximo de 20 comidas permitido na roleta!');
                return;
            }
            
            this.foods.push(foodName);
            this.saveFoodsToStorage();
            
            // Reset da rotação para evitar bugs de alinhamento
            this.currentRotation = 0;
            
            this.updateFoodList();
            this.drawWheel();
            input.value = '';
        } else if (this.foods.includes(foodName)) {
            alert('Esta comida já está na roleta!');
        }
    }

    removeFood(index) {
        this.foods.splice(index, 1);
        this.saveFoodsToStorage();
        
        // Reset da rotação para evitar bugs de alinhamento
        this.currentRotation = 0;
        
        this.updateFoodList();
        this.drawWheel();
    }

    updateFoodList() {
        const list = document.getElementById('foodList');
        list.innerHTML = '';
        
        this.foods.forEach((food, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${food}</span>
                <button class="delete-btn" onclick="wheel.removeFood(${index})">Remover</button>
            `;
            list.appendChild(li);
        });
        
        // Atualizar contador
        const counter = document.getElementById('foodCounter');
        if (counter) {
            counter.textContent = `${this.foods.length}/20 comidas`;
            counter.style.color = this.foods.length >= 20 ? '#e53e3e' : '#718096';
        }
        
        // Desabilitar botão se atingir limite
        const addBtn = document.getElementById('addFoodBtn');
        const input = document.getElementById('newFood');
        if (this.foods.length >= 20) {
            addBtn.disabled = true;
            addBtn.textContent = 'Limite atingido';
            input.disabled = true;
            input.placeholder = 'Limite máximo de 20 comidas atingido';
        } else {
            addBtn.disabled = false;
            addBtn.textContent = 'Adicionar';
            input.disabled = false;
            input.placeholder = 'Digite uma nova comida';
        }
    }

    addToHistory(food) {
        const historyItem = {
            food: food,
            date: new Date().toLocaleString('pt-BR')
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        localStorage.setItem('foodHistory', JSON.stringify(this.history));
    }

    updateHistory() {
        const historyContainer = document.getElementById('historyList');
        historyContainer.innerHTML = '';
        
        if (this.history.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; color: #718096;">Nenhum sorteio realizado ainda.</p>';
            return;
        }
        
        this.history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-food">🍽️ ${item.food}</div>
                <div class="history-date">${item.date}</div>
            `;
            historyContainer.appendChild(div);
        });
    }

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.history = [];
            localStorage.removeItem('foodHistory');
            this.updateHistory();
            this.updateStats();
        }
    }

    updateStats() {
        const statsContainer = document.getElementById('statsContainer');
        statsContainer.innerHTML = '';
        
        if (this.history.length === 0) {
            statsContainer.innerHTML = '<p style="text-align: center; color: #718096;">Nenhuma estatística disponível ainda.</p>';
            return;
        }
        
        // Count occurrences
        const foodCounts = {};
        this.history.forEach(item => {
            foodCounts[item.food] = (foodCounts[item.food] || 0) + 1;
        });
        
        // Sort by count
        const sortedFoods = Object.entries(foodCounts)
            .sort(([,a], [,b]) => b - a);
        
        const totalSpins = this.history.length;
        const maxCount = Math.max(...Object.values(foodCounts));
        
        sortedFoods.forEach(([food, count]) => {
            const percentage = ((count / totalSpins) * 100).toFixed(1);
            const barWidth = (count / maxCount) * 100;
            
            const div = document.createElement('div');
            div.className = 'stat-item';
            div.innerHTML = `
                <div class="stat-food">🍽️ ${food}</div>
                <div class="stat-count">${count}</div>
                <div class="stat-percentage">${percentage}% dos sorteios</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${barWidth}%"></div>
                </div>
            `;
            statsContainer.appendChild(div);
        });
    }
}

// Initialize the app
const wheel = new FoodWheel();