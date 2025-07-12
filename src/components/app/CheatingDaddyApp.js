import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { AppHeader } from './AppHeader.js';
import { MainView } from '../views/MainView.js';
import { CustomizeView } from '../views/CustomizeView.js';
import { HelpView } from '../views/HelpView.js';
import { HistoryView } from '../views/HistoryView.js';
import { AssistantView } from '../views/AssistantView.js';
import { OnboardingView } from '../views/OnboardingView.js';
import { AdvancedView } from '../views/AdvancedView.js';

export class CheatingDaddyApp extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0px;
            padding: 0px;
            cursor: default;
            user-select: none;
        }

        :host {
            display: block;
            width: 100%;
            height: 100vh;
            background-color: var(--background-transparent);
            color: var(--text-color);
            font-weight: 400;
            line-height: 1.5;
        }

        .window-container {
            height: 100vh;
            border-radius: var(--content-border-radius);
            overflow: hidden;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            background: linear-gradient(145deg, rgba(15, 19, 30, 0.7) 0%, rgba(20, 25, 40, 0.65) 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08);
            animation: windowAppear var(--transition-slow) var(--bounce);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .container {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .main-content {
            flex: 1;
            padding: var(--main-content-padding);
            overflow-y: auto;
            margin-top: var(--main-content-margin-top);
            border-radius: var(--content-border-radius);
            transition: all var(--transition-normal);
            background: var(--main-content-background);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: relative;
        }

        .main-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%);
            opacity: 0.6;
        }

        .main-content.with-border {
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .main-content.assistant-view {
            padding: 12px;
            border: none;
            // background: var(--main-content-background);
            background: linear-gradient(145deg, rgba(15, 19, 30, 0.3) 0%, rgba(20, 25, 40, 0.4) 100%);
        }

        .main-content.onboarding-view {
            padding: 0;
            border: none;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
        }

        .view-container {
            opacity: 1;
            transform: translateY(0);
            transition: opacity var(--transition-normal) ease-out, transform var(--transition-normal) var(--bounce);
            height: 100%;
            animation: viewSlideIn var(--transition-normal) ease-out;
        }

        .view-container.entering {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
        }

        /* Modern scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 4px;
            transition: var(--transition-normal);
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }

        /* Animation keyframes */
        @keyframes windowAppear {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-10px);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0);
            }
        }

        @keyframes viewSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Floating particle effect for premium feel */
        .window-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            background: radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
            animation: floatingParticles 8s ease-in-out infinite;
        }

        @keyframes floatingParticles {
            0%,
            100% {
                transform: translateY(0) scale(1);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-5px) scale(1.02);
                opacity: 0.6;
            }
        }

        /* Enhanced glow effects for interactive elements */
        .glow-on-hover {
            transition: all var(--transition-normal);
            position: relative;
        }

        .glow-on-hover::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.3));
            border-radius: inherit;
            opacity: 0;
            transition: opacity var(--transition-normal);
            z-index: -1;
            filter: blur(4px);
        }

        .glow-on-hover:hover::before {
            opacity: 1;
        }
    `;

    static properties = {
        currentView: { type: String },
        statusText: { type: String },
        startTime: { type: Number },
        isRecording: { type: Boolean },
        sessionActive: { type: Boolean },
        selectedProfile: { type: String },
        selectedLanguage: { type: String },
        responses: { type: Array },
        currentResponseIndex: { type: Number },
        selectedScreenshotInterval: { type: String },
        selectedImageQuality: { type: String },
        layoutMode: { type: String },
        advancedMode: { type: Boolean },
        _viewInstances: { type: Object, state: true },
        _isClickThrough: { state: true },
        _awaitingNewResponse: { state: true },
        shouldAnimateResponse: { type: Boolean },
    };

    constructor() {
        super();
        this.currentView = localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding';
        this.statusText = '';
        this.startTime = null;
        this.isRecording = false;
        this.sessionActive = false;
        this.selectedProfile = localStorage.getItem('selectedProfile') || 'interview';
        this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en-US';
        this.selectedScreenshotInterval = localStorage.getItem('selectedScreenshotInterval') || '5';
        this.selectedImageQuality = localStorage.getItem('selectedImageQuality') || 'medium';
        this.layoutMode = localStorage.getItem('layoutMode') || 'normal';
        this.advancedMode = localStorage.getItem('advancedMode') === 'true';
        this.responses = [];
        this.currentResponseIndex = -1;
        this._viewInstances = new Map();
        this._isClickThrough = false;
        this._awaitingNewResponse = false;
        this.shouldAnimateResponse = false;

        // Apply layout mode to document root
        this.updateLayoutMode();
    }

    connectedCallback() {
        super.connectedCallback();

        // Set up IPC listeners if needed
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.on('update-response', (_, response) => {
                this.setResponse(response);
            });
            ipcRenderer.on('update-status', (_, status) => {
                this.setStatus(status);
            });
            ipcRenderer.on('click-through-toggled', (_, isEnabled) => {
                this._isClickThrough = isEnabled;
            });
        }

        // Add keyboard event listener for fullscreen toggle
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.removeAllListeners('update-response');
            ipcRenderer.removeAllListeners('update-status');
            ipcRenderer.removeAllListeners('click-through-toggled');
        }

        // Remove keyboard event listener
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        // Check for Ctrl + + (Plus/Equal key) to enter fullscreen
        if (event.ctrlKey && (event.key === '+' || event.key === '=' || event.code === 'Equal')) {
            event.preventDefault();
            this.enterFullscreen();
        }
        // Check for Ctrl + - (Minus key) to exit fullscreen
        else if (event.ctrlKey && (event.key === '-' || event.code === 'Minus')) {
            event.preventDefault();
            this.exitFullscreen();
        }
    }

    async enterFullscreen() {
        // Use Electron's native fullscreen functionality
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            try {
                await ipcRenderer.invoke('enter-fullscreen');
            } catch (error) {
                console.error('Failed to enter fullscreen:', error);
            }
        }
    }

    async exitFullscreen() {
        // Use Electron's native fullscreen functionality
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            try {
                await ipcRenderer.invoke('exit-fullscreen');
            } catch (error) {
                console.error('Failed to exit fullscreen:', error);
            }
        }
    }

    async toggleFullscreen() {
        // Use Electron's native fullscreen functionality
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            try {
                await ipcRenderer.invoke('toggle-fullscreen');
            } catch (error) {
                console.error('Failed to toggle fullscreen:', error);
            }
        }
    }

    setStatus(text) {
        this.statusText = text;
    }

    setResponse(response) {
        if (this._awaitingNewResponse || this.responses.length === 0) {
            this.responses = [...this.responses, response];
            this.currentResponseIndex = this.responses.length - 1;
            this._awaitingNewResponse = false;
            console.log('[setResponse] Pushed new response:', response);
        } else {
            this.responses = [...this.responses.slice(0, this.responses.length - 1), response];
            console.log('[setResponse] Updated last response:', response);
        }
        this.shouldAnimateResponse = true;
        this.requestUpdate();
    }

    // Header event handlers
    handleCustomizeClick() {
        this.currentView = 'customize';
        this.requestUpdate();
    }

    handleHelpClick() {
        this.currentView = 'help';
        this.requestUpdate();
    }

    handleHistoryClick() {
        this.currentView = 'history';
        this.requestUpdate();
    }

    handleAdvancedClick() {
        this.currentView = 'advanced';
        this.requestUpdate();
    }

    async handleClose() {
        if (this.currentView === 'customize' || this.currentView === 'help' || this.currentView === 'history') {
            this.currentView = 'main';
        } else if (this.currentView === 'assistant') {
            cheddar.stopCapture();

            // Close the session
            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('close-session');
            }
            this.sessionActive = false;
            this.currentView = 'main';
            console.log('Session closed');
        } else {
            // Quit the entire application
            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('quit-application');
            }
        }
    }

    async handleHideToggle() {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            await ipcRenderer.invoke('toggle-window-visibility');
        }
    }

    // Main view event handlers
    async handleStart() {
        // check if api key is empty do nothing
        const apiKey = localStorage.getItem('apiKey')?.trim();
        if (!apiKey || apiKey === '') {
            // Trigger the red blink animation on the API key input
            const mainView = this.shadowRoot.querySelector('main-view');
            if (mainView && mainView.triggerApiKeyError) {
                mainView.triggerApiKeyError();
            }
            return;
        }

        await cheddar.initializeGemini(this.selectedProfile, this.selectedLanguage);
        // Pass the screenshot interval as string (including 'manual' option)
        cheddar.startCapture(this.selectedScreenshotInterval, this.selectedImageQuality);
        this.responses = [];
        this.currentResponseIndex = -1;
        this.startTime = Date.now();
        this.currentView = 'assistant';
    }

    async handleAPIKeyHelp() {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            await ipcRenderer.invoke('open-external', 'https://cheatingdaddy.com/help/api-key');
        }
    }

    // Customize view event handlers
    handleProfileChange(profile) {
        this.selectedProfile = profile;
    }

    handleLanguageChange(language) {
        this.selectedLanguage = language;
    }

    handleScreenshotIntervalChange(interval) {
        this.selectedScreenshotInterval = interval;
    }

    handleImageQualityChange(quality) {
        this.selectedImageQuality = quality;
        localStorage.setItem('selectedImageQuality', quality);
    }

    handleAdvancedModeChange(advancedMode) {
        this.advancedMode = advancedMode;
        localStorage.setItem('advancedMode', advancedMode.toString());
    }

    handleBackClick() {
        this.currentView = 'main';
        this.requestUpdate();
    }

    // Help view event handlers
    async handleExternalLinkClick(url) {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            await ipcRenderer.invoke('open-external', url);
        }
    }

    // Assistant view event handlers
    async handleSendText(message) {
        const result = await window.cheddar.sendTextMessage(message);

        if (!result.success) {
            console.error('Failed to send message:', result.error);
            this.setStatus('Error sending message: ' + result.error);
        } else {
            this.setStatus('Message sent...');
            this._awaitingNewResponse = true;
        }
    }

    handleResponseIndexChanged(e) {
        this.currentResponseIndex = e.detail.index;
        this.shouldAnimateResponse = false;
        this.requestUpdate();
    }

    // Method to focus text input when in assistant view
    focusTextInput() {
        if (this.currentView === 'assistant') {
            // Wait a bit for the view to be fully rendered
            setTimeout(() => {
                const assistantView = this.shadowRoot.querySelector('assistant-view');
                if (assistantView && assistantView.focusTextInput) {
                    assistantView.focusTextInput();

                    // Additional fallback - try to focus directly if the component method doesn't work
                    setTimeout(() => {
                        const textInput = assistantView.shadowRoot?.querySelector('#textInput');
                        if (textInput && assistantView.shadowRoot.activeElement !== textInput) {
                            textInput.focus();
                        }
                    }, 50);

                    return true;
                } else {
                    return false;
                }
            }, 100); // Give the view time to render
            return true; // Return true immediately, actual focus happens async
        } else {
            return false;
        }
    }

    // Onboarding event handlers
    handleOnboardingComplete() {
        this.currentView = 'main';
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        // Only notify main process of view change if the view actually changed
        if (changedProperties.has('currentView') && window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('view-changed', this.currentView);

            // Add a small delay to smooth out the transition
            const viewContainer = this.shadowRoot?.querySelector('.view-container');
            if (viewContainer) {
                viewContainer.classList.add('entering');
                requestAnimationFrame(() => {
                    viewContainer.classList.remove('entering');
                });
            }
        }

        // Only update localStorage when these specific properties change
        if (changedProperties.has('selectedProfile')) {
            localStorage.setItem('selectedProfile', this.selectedProfile);
        }
        if (changedProperties.has('selectedLanguage')) {
            localStorage.setItem('selectedLanguage', this.selectedLanguage);
        }
        if (changedProperties.has('selectedScreenshotInterval')) {
            localStorage.setItem('selectedScreenshotInterval', this.selectedScreenshotInterval);
        }
        if (changedProperties.has('selectedImageQuality')) {
            localStorage.setItem('selectedImageQuality', this.selectedImageQuality);
        }
        if (changedProperties.has('layoutMode')) {
            this.updateLayoutMode();
        }
        if (changedProperties.has('advancedMode')) {
            localStorage.setItem('advancedMode', this.advancedMode.toString());
        }
    }

    renderCurrentView() {
        // Only re-render the view if it hasn't been cached or if critical properties changed
        const viewKey = `${this.currentView}-${this.selectedProfile}-${this.selectedLanguage}`;

        switch (this.currentView) {
            case 'onboarding':
                return html`
                    <onboarding-view .onComplete=${() => this.handleOnboardingComplete()} .onClose=${() => this.handleClose()}></onboarding-view>
                `;

            case 'main':
                return html`
                    <main-view
                        .onStart=${() => this.handleStart()}
                        .onAPIKeyHelp=${() => this.handleAPIKeyHelp()}
                        .onLayoutModeChange=${layoutMode => this.handleLayoutModeChange(layoutMode)}
                    ></main-view>
                `;

            case 'customize':
                return html`
                    <customize-view
                        .selectedProfile=${this.selectedProfile}
                        .selectedLanguage=${this.selectedLanguage}
                        .selectedScreenshotInterval=${this.selectedScreenshotInterval}
                        .selectedImageQuality=${this.selectedImageQuality}
                        .layoutMode=${this.layoutMode}
                        .advancedMode=${this.advancedMode}
                        .onProfileChange=${profile => this.handleProfileChange(profile)}
                        .onLanguageChange=${language => this.handleLanguageChange(language)}
                        .onScreenshotIntervalChange=${interval => this.handleScreenshotIntervalChange(interval)}
                        .onImageQualityChange=${quality => this.handleImageQualityChange(quality)}
                        .onLayoutModeChange=${layoutMode => this.handleLayoutModeChange(layoutMode)}
                        .onAdvancedModeChange=${advancedMode => this.handleAdvancedModeChange(advancedMode)}
                    ></customize-view>
                `;

            case 'help':
                return html` <help-view .onExternalLinkClick=${url => this.handleExternalLinkClick(url)}></help-view> `;

            case 'history':
                return html` <history-view></history-view> `;

            case 'advanced':
                return html` <advanced-view></advanced-view> `;

            case 'assistant':
                return html`
                    <assistant-view
                        .responses=${this.responses}
                        .currentResponseIndex=${this.currentResponseIndex}
                        .selectedProfile=${this.selectedProfile}
                        .onSendText=${message => this.handleSendText(message)}
                        .shouldAnimateResponse=${this.shouldAnimateResponse}
                        @response-index-changed=${this.handleResponseIndexChanged}
                        @response-animation-complete=${() => {
                            this.shouldAnimateResponse = false;
                            this.requestUpdate();
                        }}
                    ></assistant-view>
                `;

            default:
                return html`<div>Unknown view: ${this.currentView}</div>`;
        }
    }

    render() {
        const mainContentClass = `main-content ${
            this.currentView === 'assistant' ? 'assistant-view' : this.currentView === 'onboarding' ? 'onboarding-view' : 'with-border'
        }`;

        return html`
            <div class="window-container">
                <div class="container">
                    <app-header
                        .currentView=${this.currentView}
                        .statusText=${this.statusText}
                        .startTime=${this.startTime}
                        .advancedMode=${this.advancedMode}
                        .onCustomizeClick=${() => this.handleCustomizeClick()}
                        .onHelpClick=${() => this.handleHelpClick()}
                        .onHistoryClick=${() => this.handleHistoryClick()}
                        .onAdvancedClick=${() => this.handleAdvancedClick()}
                        .onCloseClick=${() => this.handleClose()}
                        .onBackClick=${() => this.handleBackClick()}
                        .onHideToggleClick=${() => this.handleHideToggle()}
                        ?isClickThrough=${this._isClickThrough}
                    ></app-header>
                    <div class="${mainContentClass}">
                        <div class="view-container">${this.renderCurrentView()}</div>
                    </div>
                </div>
            </div>
        `;
    }

    updateLayoutMode() {
        // Apply or remove compact layout class to document root
        if (this.layoutMode === 'compact') {
            document.documentElement.classList.add('compact-layout');
        } else {
            document.documentElement.classList.remove('compact-layout');
        }
    }

    async handleLayoutModeChange(layoutMode) {
        this.layoutMode = layoutMode;
        localStorage.setItem('layoutMode', layoutMode);
        this.updateLayoutMode();

        // Notify main process about layout change for window resizing
        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('update-sizes');
            } catch (error) {
                console.error('Failed to update sizes in main process:', error);
            }
        }

        this.requestUpdate();
    }
}

customElements.define('cheating-daddy-app', CheatingDaddyApp);
