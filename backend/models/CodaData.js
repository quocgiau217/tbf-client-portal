// CodaData.js
import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    rowId: String,
    rowName: String,
    values: Object,
}, { timestamps: true });

const DataModel = mongoose.model('Data', dataSchema);

// Export có tên (named export)
export { DataModel };
