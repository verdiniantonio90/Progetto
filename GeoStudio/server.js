
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const { getAnag_Azienda, getAnag_AziendaById, getDocumentiById,postFillPdf, insertAnagrafica, insertDocumento, createAnagraficaConDocumenti} = require('./srv');

app.use(express.static(path.join(__dirname, 'webapp')));
app.use('/resources',express.static(path.join(__dirname, 'webapp')));
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
app.get('/DocById', async (req, res) => {
  try {
    const DOC = await getDocumentiById(req.headers.id);
   
    res.json({
      message: 'success',
      data: DOC
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/CreateAnagDoc', async (req, res) =>{
  try {
    const anagraficaDoc = await createAnagraficaConDocumenti(req.body.anagrafica, req.body.documenti);
    res.json({
      message:"success",
      data:anagraficaDoc
    })
    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
});
app.post('/CreateAnagrafica', async (req, res) =>{
  try {
    const anagrafica = await insertAnagrafica(req, res);
    res.json({
      message:"success",
      data:anagrafica
    })
    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
});
app.post('/CreateDocumento', async (req, res) =>{
  try {
    const documenti = await insertDocumento(req, res);
    res.json({
      message:"success",
      data:documenti
    })
    
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