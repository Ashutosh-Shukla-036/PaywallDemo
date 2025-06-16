import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/authAtom';
import { unlockAtom } from '../store/unlockAtom';
import { Article } from '../data/mockArticles';
import { Lock, Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onLockClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onLockClick }) => {
  const auth = useRecoilValue(authAtom);
  const unlockedArticles = useRecoilValue(unlockAtom);

  const isUnlocked = !article.isPremium || 
    auth.user?.subscription === 'premium' || 
    unlockedArticles.includes(article.id);

  const handleClick = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault();
      onLockClick(article);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isUnlocked) {
      e.preventDefault();
      onLockClick(article);
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={article.image}
          alt={article.title}
          className={`w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105 ${
            !isUnlocked ? 'blur-sm' : ''
          }`}
          loading="lazy"
        />
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="font-semibold text-sm sm:text-base">Premium Content</span>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
        {article.isPremium && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              <Lock className="h-3 w-3" aria-hidden="true" />
              <span>Premium</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <Link
          to={`/content/${article.id}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
          aria-describedby={`article-${article.id}-meta`}
          tabIndex={0}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className={`text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 ${
          !isUnlocked ? 'blur-sm' : ''
        }`}>
          {article.excerpt}
        </p>

        <div 
          id={`article-${article.id}-meta`}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 space-y-2 sm:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {!isUnlocked && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onLockClick(article);
              }}
              className="flex items-center justify-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors text-xs sm:text-sm"
              aria-label={`Unlock ${article.title}`}
            >
              <Lock className="h-3 w-3" aria-hidden="true" />
              <span>Unlock</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};