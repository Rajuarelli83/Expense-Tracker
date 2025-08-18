# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



import {ProfilePhotoSelector} from '../../components/Inputs/ProfilePhotoSelector';


app.use("/api/v1/auth",authRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
--router.post("/upload-image",upload.single("image"),(req,res)=>{
  if(!req.file){
    return res.status(400).json({message:"No file uploaded"});
  }
  const imageUrl =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({imageUrl});
}); then upload Middleware...