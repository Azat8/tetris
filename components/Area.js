class Area {
    static generateArea(ctx, cWidth, cHeight, xCount, yCount) {
        for(let y = 0; y < yCount; y++) {
            for(let i = 0; i < xCount; i++) {
                const xOffset = i * cWidth;
                const yOffset = y * cHeight;
                ctx.lineWidth = 1;
                ctx.strokeRect(xOffset, yOffset, cWidth, cHeight);
            }
        }
    }
}
