document.addEventListener('DOMContentLoaded', () => {
    const promptDisplay = document.getElementById('prompt-display');
    const totalPromptsElement = document.getElementById('total-prompts');
    let prompts = {};
    let usedPrompts = {};

    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            prompts = data;
            const totalPrompts = Object.values(prompts).reduce((sum, categoryPrompts) => sum + categoryPrompts.length, 0);
            totalPromptsElement.textContent = totalPrompts;
            initializeButtons();
        })
        .catch(error => {
            console.error('Error loading prompts:', error);
            alert('Failed to load prompts. Please try again later.');
        });

    function initializeButtons() {
        const buttons = document.querySelectorAll('#main button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.id.split('_')[1];
                generatePrompt(category);
            });
        });
    }

    function generatePrompt(category) {
        const promptList = prompts[category];
        if (promptList && promptList.length > 0) {
            let availablePrompts = promptList.filter(prompt => !usedPrompts[prompt]);
            if (availablePrompts.length === 0) {
                usedPrompts = {};
                availablePrompts = promptList;
            }
            const randomIndex = Math.floor(Math.random() * availablePrompts.length);
            const selectedPrompt = availablePrompts[randomIndex];
            promptDisplay.textContent = selectedPrompt;
            usedPrompts[selectedPrompt] = true;
        } else {
            promptDisplay.textContent = 'No prompts available for this category.';
        }
    }
});
