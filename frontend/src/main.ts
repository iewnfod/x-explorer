import App from './App.svelte';
import "./css/constants.css";
import "./css/overwrite.css";

const app = new App({
    target: document.getElementById('app')
});

export default app;
