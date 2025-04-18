import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  imgUrl: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imgUrl }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 transform group-hover:scale-105">
        <img 
          src={imgUrl} 
          alt={name} 
          className="w-full h-64 object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-blue-300 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};