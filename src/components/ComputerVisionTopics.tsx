import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronRight, BookOpen, Image, ScanLine, Box, Video, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const ComputerVisionTopics = () => {
  const concepts = [
    {
      title: "Convolutional Neural Networks (CNNs)",
      description: "CNNs are the backbone of computer vision. They use learnable filters (kernels) that slide across images to detect features — edges in early layers, textures in middle layers, and complex objects in deep layers. Key architectures: LeNet (1998) for digits, AlexNet (2012) that started the deep learning revolution, ResNet (2015) with skip connections enabling 152+ layer networks, and EfficientNet (2019) that optimized accuracy-efficiency tradeoffs.",
      icon: Layers,
      keyPoints: ["Convolution → ReLU → Pooling → Fully Connected", "ResNet skip connections solved vanishing gradient problem", "Transfer learning: use ImageNet-pretrained backbones"],
      realWorld: "Tesla Autopilot uses CNN-based perception. Google Photos uses CNNs for image classification and search.",
      learnMoreUrl: "https://cs231n.stanford.edu/"
    },
    {
      title: "Object Detection (YOLO, DETR)",
      description: "Object detection localizes and classifies multiple objects in images. YOLO (You Only Look Once) processes the entire image in a single pass, achieving real-time detection. YOLOv8/YOLO11 (Ultralytics) is the current standard for production systems. DETR (Detection Transformer) by Meta uses transformers for end-to-end detection without anchor boxes. Two-stage detectors like Faster R-CNN remain strong for high-accuracy scenarios.",
      icon: ScanLine,
      keyPoints: ["YOLO: single-stage, real-time at 30+ FPS", "mAP (mean Average Precision) is the standard metric", "Anchor-free detectors simplify architecture"],
      realWorld: "Self-driving cars use real-time object detection. Amazon Go stores detect products picked from shelves. Security cameras use YOLO for person detection.",
      learnMoreUrl: "https://docs.ultralytics.com/"
    },
    {
      title: "Image Segmentation (SAM)",
      description: "Image segmentation assigns a class label to every pixel. Semantic segmentation labels all pixels (road, sky, car). Instance segmentation distinguishes individual objects (car 1 vs car 2). Panoptic segmentation combines both. Meta's Segment Anything Model (SAM) is a foundation model for segmentation — it can segment any object in any image with just a point, box, or text prompt, trained on 1 billion masks.",
      icon: Image,
      keyPoints: ["U-Net architecture dominates medical image segmentation", "SAM: zero-shot segmentation with prompts", "Mask R-CNN for instance segmentation"],
      realWorld: "Medical imaging: tumor segmentation in CT scans. Agriculture: crop and weed detection. Autonomous vehicles: road scene understanding.",
      learnMoreUrl: "https://segment-anything.com/"
    },
    {
      title: "Vision Transformers (ViT)",
      description: "Vision Transformers apply the transformer architecture (originally for text) to images by splitting images into fixed-size patches and treating them as token sequences. ViT (Google, 2020) showed transformers can match or beat CNNs on image classification when trained on large datasets. DINOv2 (Meta) provides self-supervised visual features. SigLIP and CLIP connect vision and language for multimodal understanding.",
      icon: Eye,
      keyPoints: ["Images split into 16x16 or 14x14 patches as tokens", "CLIP enables zero-shot image classification via text", "DINOv2: self-supervised features without labels"],
      realWorld: "CLIP powers image search in many apps. Google Lens uses vision transformers. DALL-E and Stable Diffusion use CLIP for text-image alignment.",
      learnMoreUrl: "https://arxiv.org/abs/2010.11929"
    },
    {
      title: "Video Understanding",
      description: "Video AI extends image understanding across temporal dimensions. Action recognition classifies activities in video clips (SlowFast, VideoMAE). Video object tracking follows objects across frames (ByteTrack, SAM 2). Video generation models (Sora, Runway Gen-3) create realistic videos from text descriptions. Temporal transformers process video as sequences of frame tokens.",
      icon: Video,
      keyPoints: ["SlowFast: dual-pathway for spatial and temporal features", "SAM 2: segment and track anything in video", "Optical flow captures motion between frames"],
      realWorld: "YouTube uses video AI for content moderation and recommendations. Sports analytics uses action recognition. TikTok uses video understanding for feed ranking.",
      learnMoreUrl: "https://ai.meta.com/sam2/"
    },
    {
      title: "3D Vision & Generative Vision",
      description: "3D vision reconstructs 3D scenes from 2D images. Neural Radiance Fields (NeRF) synthesize novel views from sparse photographs. Gaussian Splatting achieves real-time 3D rendering. Depth estimation models (MiDaS, Depth Anything) predict depth from single images. Generative models: Stable Diffusion, DALL-E 3, and Midjourney create images from text. ControlNet adds precise spatial control to generation.",
      icon: Box,
      keyPoints: ["NeRF: neural scene representation from photos", "Gaussian Splatting: real-time novel view synthesis", "ControlNet: pose, edge, depth conditioning for generation"],
      realWorld: "Apple Vision Pro uses depth estimation. Real estate uses NeRF for virtual tours. E-commerce uses generative AI for product images.",
      learnMoreUrl: "https://stability.ai/stable-diffusion"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200 border-0 px-4 py-1.5">
            <Eye className="w-4 h-4 mr-1" /> Visual Intelligence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Computer Vision & Image AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From CNNs and object detection to vision transformers, segmentation, and generative image models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{concept.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm"><span className="font-semibold text-foreground">Real-World:</span> <span className="text-muted-foreground">{concept.realWorld}</span></p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/30" onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Read Research / Docs</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
