import mongoose from 'mongoose';

// Định nghĩa Schema và Model cho dữ liệu
const dataSchema = new mongoose.Schema({
  rowId: String,
  rowName: String,
  values: Object,
}, { timestamps: true });

const DataModel = mongoose.models.Data || mongoose.model('Data', dataSchema);

// Kết nối tới MongoDB Atlas
async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined. Please check your .env.local file.');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  }
}

// Hàm API để lấy dữ liệu từ MongoDB
export async function GET(req) {
  await connectToDB();

  try {
    const data = await DataModel.find(); // Lấy toàn bộ dữ liệu từ MongoDB
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Lỗi khi lấy dữ liệu từ MongoDB' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
