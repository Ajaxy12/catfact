# Versionshantering

Projektet använder Git för versionshantering. Alla ändringar committas med tydliga commit-meddelanden.

## Git-kommandon som används i projektet

### Kontrollera status
```bash
git status
```

### Lägg till filer
```bash
git add .
```

### Committa ändringar
```bash
git commit -m "Beskrivande commit-meddelande"
```

### Pusha till GitHub
```bash
git push origin main
```

### Hämta senaste ändringar
```bash
git pull origin main
```

## Kommandon för att skicka uppdateringar

För att skicka ändringar till GitHub används följande kommandon:

### 1. Kontrollera status - se vilka filer som har ändrats
```bash
git status
```

### 2. Lägg till filer - lägg till alla ändrade filer
```bash
git add .
```

### 3. Committa ändringar - spara ändringarna med ett beskrivande meddelande
```bash
git commit -m "Beskrivande commit-meddelande"
```

### 4. Pusha till GitHub - skicka ändringarna till GitHub
```bash
git push origin main
```

## Hämta uppdateringar från GitHub

För att hämta senaste ändringar från GitHub när projektet arbetas med på flera datorer:

```bash
git pull origin main
```

## Initial setup av Git repository

För att skapa ett nytt Git repository och koppla det till GitHub:

### 1. Initiera Git repository
```bash
git init
```

### 2. Lägg till alla filer
```bash
git add .
```

### 3. Skapa första commit
```bash
git commit -m "Initial commit: CatFact application"
```

### 4. Lägg till remote repository (efter att ha skapat repo på GitHub)
```bash
git remote add origin https://github.com/DITT-ANVÄNDARNAMN/catfact.git
```

### 5. Pusha till GitHub
```bash
git branch -M main
git push -u origin main
```

## Projektinformation

**Projekt**: CatFact  
**Skapad**: 2025  
**Senast uppdaterad**: 2025-11-25  
**Version**: 1.0.0

---

*Detta projekt är skapat för utbildningssyfte och demonstrerar användning av vanilla JavaScript, CSS Flexbox och responsiv design.*

