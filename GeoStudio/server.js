
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const { getAnag_Azienda, getAnag_AziendaById, getDocumentiById,postFillPdf} = require('./srv');

app.use(express.static(path.join(__dirname, 'webapp')));
app.use('/resources', express.static(path.join(__dirname, 'webapp')));

app.use(express.json());

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'webapp', 'index.html'));
});
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'webapp', 'index.html'));
});
app.get('/AnagraficaSet',async (req,res)=>{
     try {
    const utenti = await getAnag_Azienda();
   
    res.json({
      message: 'success',
      data: utenti
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/fillpdf', async (req, res) => { 
    
        await postFillPdf(req,res);
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});