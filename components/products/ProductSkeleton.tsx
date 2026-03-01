import React from 'react';

export function ProductSkeleton() {
    return (
        <div className="card overflow-hidden flex flex-col" aria-hidden="true">
            {/* Image skeleton */}
            <div className="skeleton aspect-[4/3]" />

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Category */}
                <div className="skeleton h-3 w-20 rounded-full" />
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-3/4 rounded" />
                </div>
                {/* Description */}
                <div className="flex flex-col gap-1">
                    <div className="skeleton h-3 w-full rounded" />
                    <div className="skeleton h-3 w-5/6 rounded" />
                </div>
                {/* SKU */}
                <div className="skeleton h-3 w-24 rounded" />
            </div>

            {/* Actions skeleton */}
            <div className="px-5 pb-5 pt-4 border-t border-[var(--color-border)] flex gap-2">
                <div className="skeleton h-10 flex-1 rounded-lg" />
                <div className="skeleton h-10 flex-1 rounded-lg" />
            </div>
        </div>
    );
}
