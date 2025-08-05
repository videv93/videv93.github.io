const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="brutal-card bg-brutal-yellow text-black inline-block px-6 py-3 mb-4 transform rotate-1">
            <p className="font-black uppercase text-sm">
              © 2025 VI TRAN
            </p>
          </div>
          <p className="font-bold text-sm">
            BUILT WITH PASSION FOR AI AND BLOCKCHAIN TECHNOLOGY
          </p>
          <div className="mt-4">
            <div className="brutal-card bg-brutal-pink text-white inline-block px-4 py-2 transform -rotate-1">
              <p className="font-black uppercase text-xs">
                POWERED BY NEXT.JS + SHADCN/UI + NEOBRUTALISM
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer