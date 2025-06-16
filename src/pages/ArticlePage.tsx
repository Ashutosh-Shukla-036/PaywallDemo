import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/authAtom';
import { unlockAtom } from '../store/unlockAtom';
import { mockArticles } from '../data/mockArticles';
import { Clock, Calendar, ArrowLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useRecoilValue(authAtom);
  const unlockedArticles = useRecoilValue(unlockAtom);

  const article = mockArticles.find(a => a.id === id);

  if (!article) {
    return <Navigate to="/content" replace />;
  }

  const isUnlocked = !article.isPremium || 
    auth.user?.subscription === 'premium' || 
    unlockedArticles.includes(article.id);

  if (!isUnlocked) {
    return <Navigate to="/content" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/content"
          className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Content</span>
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  {article.category}
                </span>
                {article.isPremium && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                    <Crown className="h-3 w-3" />
                    <span>Premium</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {article.title}
              </h1>
              <div className="flex items-center space-x-6 text-white/80 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {article.excerpt}
              </p>
              <div className="text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover more premium content in our library
          </p>
          <Link
            to="/content"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Explore More Articles
          </Link>
        </div>
      </div>
    </div>
  );
};