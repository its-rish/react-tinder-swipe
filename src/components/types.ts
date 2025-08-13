export interface SwipeCardProps {
  children: React.ReactNode;
  isTop: boolean;
  onSwipe: (offsetX: number) => void;
  exitX?: number;
  controls?: any;
  disableSwiping?: boolean;
  onDragUpdate: (dir: "left" | "right" | null) => void;
  rotateValue:number;
}