# mind1

**App de producción:** `COPIAJALEEE/clearmind-ui`

## Deployment (Vercel)

Todo se despliega desde una única carpeta: `COPIAJALEEE/clearmind-ui`

El archivo `vercel.json` (en raíz) apunta automáticamente a esa carpeta:

```json
{
  "rootDirectory": "COPIAJALEEE/clearmind-ui"
}
```

### Pasos para nuevo deploy

1. Crea proyecto en Vercel apuntando a este repo (cgv1106dd-png/mind1)
2. Vercel detecta `vercel.json` automáticamente
3. Deploy sin errores → OK ✅

### Cómo correr local

```bash
cd COPIAJALEEE/clearmind-ui
python3 -m http.server 8000
# Abre http://localhost:8000
```

