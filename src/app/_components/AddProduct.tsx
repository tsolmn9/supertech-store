import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type categoryType = {
  id: string;
  categoryName: string;
  categoryImg: string;
};

export const AddProduct = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);

  const uploadImages = async () => {
    if (!images) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(images).map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ace_area");
        formData.append("cloud_name", "dl93ggn7x");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getCategories = async () => {
    const JSONdata = await fetch("../api/product/getAllCategory", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await JSONdata.json();
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddProduct = async () => {
    const response = await fetch("../api/product/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        imgUrl: uploadedImages[0],
        categoryId: selectedCategoryId,
      }),
    });
    if (response === null) {
      alert("Failed");
    } else {
      alert("Амжилттай нэмэгдлээ");
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Image
            </Label>
            <Input
              type="file"
              className="col-span-3"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setImages(files);
                }
              }}
            />
          </div>

          <Button onClick={uploadImages} className="hover:cursor-pointer">
            {uploading ? "Uploading" : "Upload"}
          </Button>

          <div className="text-center w-90%">
            {uploadedImages.map((img, index) => (
              <div className="flex flex-col items-center gap-4" key={index}>
                <img
                  src={img}
                  className="aspect-auto rounded-lg shadow-lg w-[300px]"
                  alt="Uploaded"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              placeholder="Name"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              placeholder="Description"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              placeholder="Price"
              className="col-span-3"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <Select onValueChange={(e) => setSelectedCategoryId(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, i) => (
                <SelectItem key={i} value={category.id}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleAddProduct}
            className="hover:cursor-pointer"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
