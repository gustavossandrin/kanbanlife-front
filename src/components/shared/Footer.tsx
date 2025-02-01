const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Kanban Life - Developed by Gustavo
        </p>
      </div>
    </footer>
  );
};

export default Footer; 