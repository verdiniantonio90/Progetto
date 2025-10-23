const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
// const cors = require('cors');
// const db = new sqlite3.Database('./DbAnagrafica.db', (err) => {
//   if (err) {
//     console.error('Errore di connessione al database:', err.message);
//   } else {
//     console.log('Connesso al database SQLite');
//   }
// });
// const getAnag_Azienda = () => {
//   return new Promise((resolve, reject) => {
//     var response;
//     const sql = 'SELECT * FROM ANAG_AZIENDA';
//     db.all(sql, [], (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         response = rows
//         resolve(rows);
//       }
//     });
//   });
// }
// const getAnag_AziendaById = (id) => {
//   return new Promise((resolve, reject) => {
//     const sql = 'SELECT * FROM utenti WHERE id = ?';
//     db.get(sql, [id], (err, row) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(row);
//       }
//     });
//   });
// };
// const getDocumentiById = (id) => {
  
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM documenti WHERE documenti.fk_id = ?`;
//     db.all(sql, [id], (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// }
// const insertAnagrafica = (req,res) => {
//   return new Promise((resolve, reject) => {
 

//     const sql = `INSERT INTO ANAG_AZIENDA (nome, cognome, indirizzo, cap, dataNascita, telefono, cellulare, email, pec, cf, p_iva) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const params = [
//       req.nome,
//       req.cognome,
//       req.indirizzo,
//       req.cap,
//       req.dataNascita,
//       req.telefono,
//       req.cellulare,
//       req.email,
//       req.pec,
//       req.cf,
//       req.p_iva
//     ];
//     db.run(sql, params, function (err) {
//       if (err) {
//         console.error('Errore SQL:', err);
//         reject(err);
//       } else {
//         resolve({ id: this.lastID });
//       }
//     });
  
//   });
// };
// const insertDocumento = (req,idAnagrafica) => {

//    return new Promise((resolve, reject) => {
    
//  for(var x = 0 ; x < req.length; x++){
//    const sql = `INSERT INTO DOCUMENTI (fk_id, tipologia, num_doc) 
//                  VALUES (?, ?, ?)`;
//     const params = [
//       idAnagrafica,
//       req[x].tipologia,
//       req[x].num_doc
//     ];
//     db.run(sql, params, function (err) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ id: this.lastID });
//       }
//     });
//   }
//   });
// };

const postFillPdf = async (req,res) => {
    try {
        
        const formData = req.body;
        // F:\GeoStudio\webapp\delega.pdf
       // const pdfBytes= await fs.readFile('./webapp/delega.pdf');
      // const pdfBytes = await fs.readFile('./webapp/delega.pdf');
      const pdfBytes = await fs.readFile('F:/GeoStudio/webapp/delega.pdf');
        // await fs.readFile('./webapp/delega.pdf', (err, data) => {
        //   if (err) {
        //     console.error('Errore durante la lettura del file:', err.message);
        //     return null;
        //   }
        //    pdfBytes = data;
        //   });
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const pages = pdfDoc.getPages();
          const firstPage = pages[0]; // Pagina 1 con il form
          const fontSize = 10;
        //const pdfBytes = await fs.readFile('delega.pdf');

    
    
    firstPage.drawText(formData.sottoscritto || '', {
        x: 135, y: 605, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.nato_il || '', {
        x: 451, y: 605, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.luogo_nascita || '', {
        x: 60, y: 591.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.cf || '', {
      x: 220, y: 591.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.telefono || '', {
      x: 110, y: 579, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.cell || '', {
        x: 400, y: 579, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.tipodoc +(" ") + formData.documento_n || '', {
      x: 131, y: 566, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.email || '', {
        x: 71, y: 554, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.pec || '', {
        x: 245, y: 554, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.residente_in || '', {
      x: 60, y: 542, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.via_piazza || '', {
        x: 100, y: 529, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.cap || '', {
        x: 405, y: 529, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.immobilestatus || '', {
      x: 85, y: 465, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.richiestacondono || '', {
        x: 135, y: 451, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
     firstPage.drawText(formData.datarichiesta || '', {
      x: 345, y: 451, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    


    // Campi per il delegato
    firstPage.drawText(formData.delegato_nome || '', {
      x: 118, y: 440, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_nato_il || '', {
        x: 60, y: 428, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_luogo || '', {
        x: 190, y: 428, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_cf || '', {
        x: 389, y: 428, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_residente || '', {
      x: 60, y: 414.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_via_piazza || '', {
        x: 370, y: 414.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_cap || '', {
      x: 70, y: 402, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_tipodoc +" "+ formData.delegato_documento_n || '', {
        x: 60, y: 389.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_email || '', {
      x: 156, y: 389.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    firstPage.drawText(formData.delegato_pec || '', {
      x: 300, y: 389.5, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });

    // Checkbox (disegna 'X' se selezionato)
    if (formData.presentare) {
      firstPage.drawText('x', { x: 164.5, y: 362, size: 12, font: helveticaFont, color: rgb(0, 0, 0) });
    }
    if (formData.richiedeCopie) {
      firstPage.drawText('x', { x: 164.5, y: 343.5, size: 12, font: helveticaFont, color: rgb(0, 0, 0) });
    }
    if (formData.ritirare) {
      firstPage.drawText('x', { x: 164.5, y: 325, size: 12, font: helveticaFont, color: rgb(0, 0, 0) });
    }
    if (formData.altro) {
      firstPage.drawText('x', { x: 164.5, y: 306.5, size: 12, font: helveticaFont, color: rgb(0, 0, 0) });
      firstPage.drawText(formData.altro_specifica || '', { x: 275, y: 307, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0) });
    }
    
    firstPage.drawText(formData.data || '', {
        x: 90, y: 195, size: fontSize, font: helveticaFont, color: rgb(0, 0, 0),
    });
    
    const filledPdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=delega_riempita.pdf');
    res.send(Buffer.from(filledPdfBytes));
} catch (error) {
    console.error(error);
    res.status(500).send('Errore nel riempimento del PDF');
  }
};
const createAnagraficaConDocumenti = (dataAnagrafica, dataDocumenti) => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        return reject(err);
      }

      // Prima insert: anagrafica
     
      insertAnagrafica(dataAnagrafica)
        .then((resultAnagrafica) => {
          // Se OK, seconda insert: documenti (passa l'ID anagrafica se necessario)
          return insertDocumento(dataDocumenti, resultAnagrafica.id)
            .then((resultDocumenti) => {
              // Tutto OK: commit
              db.run('COMMIT', (commitErr) => {
                if (commitErr) {
                  reject(commitErr);
                } else {
                  resolve({
                    message: 'Inserimento completato',
                    anagrafica: resultAnagrafica,
                    documenti: resultDocumenti
                  });
                }
              });
            });
        })
        .catch((err) => {
          // Errore in una delle insert: rollback
          db.run('ROLLBACK', (rollbackErr) => {
            if (rollbackErr) {
              console.error('Errore durante rollback:', rollbackErr);
            }
            reject(err); // Rifiuta con l'errore originale
          });
        });
    
    });
  });
}
module.exports = { getAnag_Azienda, getAnag_AziendaById , getDocumentiById, postFillPdf,insertAnagrafica, insertDocumento, createAnagraficaConDocumenti };