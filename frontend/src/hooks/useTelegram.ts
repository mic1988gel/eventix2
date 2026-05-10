import { useEffect, useState } from 'react';
interface TelegramUser { id: number; first_name: string; last_name?: string; username?: string; }


export function useTelegram() { const [user, setUser] = useState<TelegramUser | null>(null);


useEffect(() => { if (window.Telegram?.WebApp) { const tg = window.Telegram.WebApp; tg.ready(); setUser(tg.initDataUnsafe.user || null);


// Применяем тему Telegram document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor); document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor); document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor); } }, []);


return { user }; }

