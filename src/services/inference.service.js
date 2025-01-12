const tfjs = require('@tensorflow/tfjs-node');

const predictWasteType = async (imageBuffer, model) => {
    const tensor = tfjs.node
        .decodeJpeg(imageBuffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(tfjs.scalar(255))

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const labels = ['Anorganik', 'Organik', 'B3'];

    const maxIndex = tfjs.argMax(prediction, 1).dataSync()[0];

    const result = labels[maxIndex];

    const explanation =
        result === 'Organik' ? 'Sampah yang berasal dari makhluk hidup, seperti sisa makanan, daun, ranting, dan buah-buahan. Sampah organik dapat terurai secara alami di lingkungan. Sampah organik dapat diproses menjadi pupuk kompos.'
            : result === 'Anorganik' ? 'Sampah yang berasal dari benda tak hidup, seperti plastik, kaleng, kaca, logam, dan styrofoam. Sampah anorganik sulit terurai atau dapat terurai tetapi dengan waktu yang sangat lama. Sampah anorganik dapat dimanfaatkan kembali, misalnya untuk membuat kerajinan'
                : 'Sampah yang mengandung zat kimia yang dapat membahayakan manusia, hewan, dan lingkungan sekitar. Sampah B3 memiliki karakteristik mudah meledak, mudah terbakar, bersifat reaktif, beracun, infeksius, dan bersifat korosif. Contoh sampah B3 adalah baterai bekas, neon atau bohlam bekas, kaleng aerosol kosong bekas obat nyamuk, pewangi ruangan, dan lainnya.';

    return { confidenceScore, result, explanation };
}

module.exports = predictWasteType;
