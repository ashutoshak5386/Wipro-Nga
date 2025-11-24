const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);           // Needed for Socket.io
const io = new Server(server);

const PORT = 3000;

// ---------- Static Files ----------
// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded PDFs
app.use('/materials', express.static(path.join(__dirname, 'uploads')));

// ---------- Multer Setup for PDF Uploads ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // Simple sanitation: remove spaces, prepend timestamp
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + safeName);
  }
});

function pdfFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: pdfFilter
});

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /upload → "File uploaded successfully: module1.pdf"
app.post('/upload', upload.single('material'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or wrong file type');
  }

  // You can also send JSON if you want to show link on frontend
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

// ---------- Socket.io Real-Time Chat ----------
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Receive chat messages from a client
  socket.on('chatMessage', (messageText) => {
    const payload = {
      id: socket.id.slice(0, 5),
      text: messageText,
      time: new Date().toLocaleTimeString()
    };

    // Broadcast to everyone
    io.emit('chatMessage', payload);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ---------- Start Server ----------
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
