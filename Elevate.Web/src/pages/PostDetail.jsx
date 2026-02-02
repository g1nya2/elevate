import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const VALID_CATEGORIES = ['m365', 'copilot', 'minecraft', 'teams'];

const CATEGORY_DISPLAY_NAMES = {
    'm365': 'Microsoft 365',
    'copilot': 'Copilot',
    'minecraft': 'Minecraft',
    'teams': 'Microsoft Teams'
};

// slug를 사람이 읽기 쉬운 제목으로 변환
const slugToTitle = (slug) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const PostDetail = () => {
    const { category, postId } = useParams();
    
    // 카테고리를 소문자로 변환하여 검증
    const normalizedCategory = category?.toLowerCase();
    
    // 유효하지 않은 카테고리인 경우 404로 리다이렉트
    if (!VALID_CATEGORIES.includes(normalizedCategory)) {
        return <Navigate to="*" replace />;
    }

    const categoryDisplayName = CATEGORY_DISPLAY_NAMES[normalizedCategory];
    const postTitle = slugToTitle(postId);

    return (
        <div className="relative min-h-screen font-sans selection:bg-ms-blue/20 selection:text-ms-blue">
            <Helmet>
                <title>{postTitle} | {categoryDisplayName} | Microsoft Elevate</title>
                <meta name="description" content={`${postTitle} - ${categoryDisplayName} 블로그 포스트입니다.`} />
                <meta property="og:title" content={`${postTitle} | ${categoryDisplayName} | Microsoft Elevate`} />
                <meta property="og:description" content={`${postTitle} - ${categoryDisplayName} 블로그 포스트입니다.`} />
            </Helmet>

            {/* Background Blobs */}
            <div className="pastel-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Post Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-4xl">
                    <div className="clean-card rounded-[3rem] p-12 bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50">
                        {/* Breadcrumb */}
                        <div className="text-sm text-slate-500 mb-6">
                            <span>Home</span>
                            <span className="mx-2">/</span>
                            <span>Blog</span>
                            <span className="mx-2">/</span>
                            <span>{categoryDisplayName}</span>
                        </div>

                        {/* Post Title */}
                        <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4 tracking-tight">
                            {postTitle}
                        </h1>

                        {/* Category Badge */}
                        <div className="mb-8">
                            <span className="inline-block px-4 py-2 bg-ms-blue/10 text-ms-blue rounded-full text-sm font-medium">
                                {categoryDisplayName}
                            </span>
                        </div>

                        {/* Post Content Placeholder */}
                        <div className="prose prose-lg max-w-none text-slate-600">
                            <p className="text-xl leading-relaxed">
                                게시글 내용이 곧 제공됩니다.
                            </p>
                            <p className="mt-4 text-base">
                                Post ID: <code className="px-2 py-1 bg-slate-100 rounded">{postId}</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
