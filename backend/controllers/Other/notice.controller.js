const Notice = require("../../models/Other/notice.model");
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });


// Get Notices
const getNotice = async (req, res) => {
    try {
        let notice = await Notice.find({});
        if (notice.length > 0) {
            res.json({ success: true, message: "Notice Fetched Successfully", notice });
        } else {
            res.status(404).json({ success: false, message: "No Notices Available!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Add Notice
const addNotice = async (req, res) => {
    let { link, description, title, type } = req.body;
    try {
        let existingNotice = await Notice.findOne({ link, description, title, type });
        if (existingNotice) {
            return res.status(400).json({ success: false, message: "Notice Already Exists!" });
        }

        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

        const newNotice = new Notice({
            link,
            description,
            title,
            type,
            image: imageUrl,
        });

        await newNotice.save();
        res.json({ success: true, message: "Notice Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update Notice
const updateNotice = async (req, res) => {
    let { link, description, title, type } = req.body;
    try {
        let notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(400).json({ success: false, message: "No Notice Available!" });
        }

        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : notice.image;

        await Notice.findByIdAndUpdate(req.params.id, {
            link,
            description,
            title,
            type,
            image: imageUrl,
        });

        res.json({ success: true, message: "Notice Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete Notice
const deleteNotice = async (req, res) => {
    try {
        let notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(400).json({ success: false, message: "No Notice Available!" });
        }
        res.json({ success: true, message: "Notice Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { getNotice, addNotice: [upload.single("image"), addNotice], updateNotice: [upload.single("image"), updateNotice], deleteNotice };
