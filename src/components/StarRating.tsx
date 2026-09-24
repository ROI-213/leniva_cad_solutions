import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}
