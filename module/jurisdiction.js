import { message } from 'antd';
import moment from 'moment';

const common = {
    //获取用户权限
    getUsersPromission(promissionList, type) {
        let knowledgeManagement,
            knowledgeQuery,
            labelQuestion,
            addQuestion,
            questionQelation,
            questionEmotion,
            questionIntention,
            questionContrast,
            questionPage,
            newCreatQuestionRight,
            newCreatQuestion,
            editQuestionRight,
            editQuestion,
            deleteQuestionRight,
            deleteQuestion,
            questionRightlabel,
            questionEmotionLabel,
            questionIntentionLabel,
            questionRightCompile,
            questionEmotionCompile,
            questionIntentionCompile,
            editQuestionQuery,
            searchQuestion,
            searchQuestionEdit,
            searchQuestionDelete,
            searchKnowledge,
            authorityManagement,
            lexiconMaintain,
            sensitivePage,
            sensitivePageAdd,
            sensitivePageEdit,
            sensitivePageDelete,
            sensitivePageLead,
            synonymPage,
            synonymPageAdd,
            synonymPageEdit,
            synonymPageDelete,
            synonymPageLead,
            thesaurusPage,
            thesaurusPageAdd,
            thesaurusPageEdit,
            thesaurusPageDelete,
            thesaurusPageLead,
            manageKnowledge,
            informActivityProductAdd,
            informActivityProductDelete,
            informActivityProductEdit,
            multiLanguageAdd,
            multiLanguageEdit,
            multiLanguageDelete,
            ebayLabelPage,
            ebayLabelPageMark,
            ebayLabelPageEdit,
            productCommentPage,
            productCommentAdd,
            productCommentEdit,
            productInfoPage,
            productInfoAdd,
            productInfoEdit,
            QAedit,
            Monitoring,
            nlpBaseManage,
            translateLabel,
            translateLabelAdd,
            translateLabelEdit,
            onLineTranslateLabel,
            onLineTranslateLabelAdd,
            onLineTranslateLabelEdit,
            queryRewrite,
            queryRewriteAdd,
            queryRewriteToleadAdd,
            queryRewriteEdit,
            queryRewriteAudit;
        promissionList && promissionList.forEach(item => {
            // 知识查询 1
            if (item[type] === 'scs:search') {
                knowledgeQuery = true;
            }
            //  QA问题搜索页面  2
            if (item[type] === 'scs:search_question') {
                searchQuestion = true;
            }
            //问题搜索页修改问题 3
            if (item[type] === 'scs:question_modify:edit') {
                editQuestionQuery = true;
            }
            //问题搜索添加问题  4
            if (item[type] === 'scs:question_add:edit') {
                searchQuestionEdit = true;
            }
            //问题搜索页删除问题    5
            if (item[type] === 'scs:question_delete:edit') {
                searchQuestionDelete = true;
            }

            //知识点搜索页面    6
            if (item[type] === 'scs:search_knowledge') {
                searchKnowledge = true;
            }
            //知识管理 7
            if (item[type] === 'scs:manage') {
                knowledgeManagement = true;
            }
            //NLP基础管理 7
            if (item[type] === 'scs:nlp_base_manage') {
                nlpBaseManage = true;
            }
            //知识管理 监控和维护   8
            if (item[type] === 'scs:manage_monitoring') {
                Monitoring = true;
            }
            //问题添加 9
            if (item[type] === 'scs:manage_add') {
                addQuestion = true;
            }
            //问题对页面 10
            if (item[type] === 'scs:manage_add_pair') {
                questionContrast = true;
            }
            //问题页面 11
            if (item[type] === 'scs:manage_add_question') {
                questionPage = true;
            }
            //问题标注  12
            if (item[type] === 'scs:manage_mark') {
                labelQuestion = true;
            }
            //意图关系标注列表页面 13
            if (item[type] === 'scs:manage_mark_pair') {
                questionQelation = true;
            }
            //问题情感页面 14
            if (item[type] === 'scs:manage_mark_sentiment') {
                questionEmotion = true;
            }
            //问题意图页面 15
            if (item[type] === 'scs:manage_mark_intent') {
                questionIntention = true;
            }
            //词库维护  16
            if (item[type] === 'scs:manage_word') {
                lexiconMaintain = true;
            }
            //敏感词页面    17
            if (item[type] === 'scs:manage_word_sensitive') {
                sensitivePage = true;
            }
            //同义词页面    18
             if (item[type] === 'scs:manage_word_synonymy') {
                synonymPage = true;
            }
            //实体词页面    19
            if (item[type] === 'scs:manage_word_entity') {
                thesaurusPage = true;
            }
            //知识点添加    20
            if (item[type] === 'scs:manage_knowledge') {
                manageKnowledge = true;
            }
            //知识管理Q&A编辑页面   意图管理  21
            if (item[type] === 'scs:manage_intent') {
                QAedit = true;
            }
            //新增问题对 18
            if (item[type] === 'scs:add_questionPair_add:edit') {
                newCreatQuestionRight = true;
            }
            //编辑问题对 19
            if (item[type] === 'scs:add_questionPair_modify:edit') {
                editQuestionRight = true;
            }
            //删除问题对 20
            if (item[type] === 'scs:add_questionPair_delete:edit') {
                deleteQuestionRight = true;
            }
            //新增问题 21
            if (item[type] === 'scs:add_question_add:edit') {
                newCreatQuestion = true;
            }
            //编辑问题 22
            if (item[type] === 'scs:add_question_modify:edit') {
                editQuestion = true;
            }
            //删除问题 23
            if (item[type] === 'scs:add_question_delete:edit') {
                deleteQuestion = true;
            }
            //问题关系对标注 6
            if (item[type] === 'scs:mark_questionPair_mark:edit') {
                questionRightlabel = true;
            }
            //问题关系对对编辑 16
            if (item[type] === 'scs:mark_questionPair_modify:edit') {
                questionRightCompile = true;
            }
            //问题情感标注 10
            if (item[type] === 'scs:mark_questionSentiment_mark:edit') {
                questionEmotionLabel = true;
            }
            //问题情感编辑 18
            if (item[type] === 'scs:mark_questionSentiment_modify:edit') {
                questionEmotionCompile = true;
            }
            //问题意图标注 8
            if (item[type] === 'scs:mark_questionIntent_mark:edit') {
                questionIntentionLabel = true;
            }
            //问题意图编辑 13
            if (item[type] === 'scs:mark_questionIntent_modify:edit') {
                questionIntentionCompile = true;
            }
            //敏感词新增
            if (item[type] === 'scs:sensitive_word_add:edit') {
                sensitivePageAdd = true;
            }
            //敏感词编辑
            if (item[type] === 'scs:sensitive_word_update:edit') {
                sensitivePageEdit = true;
            }
            //敏感词删除
            if (item[type] === 'scs:sensitive_word_delete:edit') {
                sensitivePageDelete = true;
            }
            //敏感词导入
            if (item[type] === 'scs:sensitive_word_batchimport:edit') {
                sensitivePageLead = true;
            }
            //同义词新增
            if (item[type] === 'scs:synonymy_word_add:edit') {
                synonymPageAdd = true;
            }
            //同义词编辑
            if (item[type] === 'scs:synonymy_word_update:edit') {
                synonymPageEdit = true;
            }
            //同义词删除
            if (item[type] === 'scs:synonymy_word_delete:edit') {
                synonymPageDelete = true;
            }
            // 同义词导入
            if (item[type] === 'scs:synonymy_word_batchimport:edit') {
                synonymPageLead = true;
            }
            
            //实体词新增
            if (item[type] === 'scs:entity_word_add:edit') {
                thesaurusPageAdd = true;
            }
            //实体词编辑
            if (item[type] === 'scs:entity_word_update:edit') {
                thesaurusPageEdit = true;
            }
            //实体词删除
            if (item[type] === 'scs:entity_word_delete:edit') {
                thesaurusPageDelete = true;
            }
            //实体词导入
            if (item[type] === 'scs:entity_word_batchimport:edit') {
                thesaurusPageLead = true;
            }
            
            //通知添加
            if (item[type] === 'scs:inform_activity_product_add:edit') {
                informActivityProductAdd = true;
            }
            //通知删除
            if (item[type] === 'scs:inform_activity_product_delete:edit') {
                informActivityProductDelete = true;
            }
            //通知修改
            if (item[type] === 'scs:inform_activity_product_update:edit') {
                informActivityProductEdit = true;
            }
            //多语言添加
            if (item[type] === 'scs:multiLanguage_add:edit') {
                multiLanguageAdd = true;
            }
            //多语言删除
            if (item[type] === 'scs:multiLanguage_delete:edit') {
                multiLanguageDelete = true;
            }
            //多语言编辑
            if (item[type] === 'scs:multiLanguage_edit:edit') {
                multiLanguageEdit = true;
            }
            //权限管理页面
            if (item[type] === 'scs:audit') {
                authorityManagement = true;
            }
            //长意图标注列表页面权限
            if (item[type] === 'scs:ebay_mark') {
                ebayLabelPage = true;
            }
            //长意图标注新增权限
            if (item[type] === 'scs:ebay_mark_mark:edit') {
                ebayLabelPageMark = true;
            }
            //长意图标注页面编辑权限
            if (item[type] === 'scs:ebay_mark_edit:edit') {
                ebayLabelPageEdit = true;
            }
            //实体关系标注页面权限
            if (item[type] === 'scs:product_comment_mark') {
                productCommentPage = true;
            }
            //实体关系标注页面新增权限
            if (item[type] === 'scs:product_comment_mark_add') {
                productCommentAdd = true;
            }
            //实体关系标注页面编辑权限
            if (item[type] === 'scs:product_comment_mark_edit') {
                productCommentEdit = true;
            }
            //实体标注页面编辑权限
            if (item[type] === 'scs:product_info_mark') {
                productInfoPage = true;
            }
            //实体标注页面编辑权限
            if (item[type] === 'scs:product_info_mark_add') {
                productInfoAdd = true;
            }
            //实体标注页面编辑权限
            if (item[type] === 'scs:product_info_mark_edit') {
                productInfoEdit = true;
            }
            //翻译标注权限
            if (item[type] === 'scs:translate_label') {
                translateLabel = true;
            }
            //翻译标注新增
            if (item[type] === 'scs:translate_label_add') {
                translateLabelAdd = true;
            }
            //翻译标注编辑
            if (item[type] === 'scs:translate_label_edit') {
                translateLabelEdit = true;
            }
            //线上翻译标注权限
            if (item[type] === 'scs:Online_translate_label') {
                onLineTranslateLabel = true;
            }
            //线上翻译标注新增
            if (item[type] === 'scs:Online_translate_label_add') {
                onLineTranslateLabelAdd = true;
            }
            //线上翻译标注编辑
            if (item[type] === 'scs:Online_translate_label_edit') {
                onLineTranslateLabelEdit = true;
            }
            // query词改写权限
            if (item[type] === 'scs:query_rewrite') {
                queryRewrite = true;
            }
            // query词改新增
            if (item[type] === 'scs:query_rewrite_add') {
                queryRewriteAdd = true;
            }
            // query词改daoru
            if (item[type] === 'scs:query_rewrite:add') {
                queryRewriteToleadAdd = true;
            }
            // query词改写编辑
            if (item[type] === 'scs:query_rewrite_edit') {
                queryRewriteEdit = true;
            }
            // query词改写发布
            if (item[type] === 'scs:query_rewrite_audit') {
                queryRewriteAudit = true;
            }
            
            
        });

        return {
            knowledgeManagement,
            knowledgeQuery,
            labelQuestion,
            addQuestion,
            questionQelation,
            questionEmotion,
            questionIntention,
            questionContrast,
            questionPage,
            newCreatQuestionRight,
            newCreatQuestion,
            editQuestionRight,
            editQuestion,
            deleteQuestionRight,
            deleteQuestion,
            questionRightlabel,
            questionEmotionLabel,
            questionIntentionLabel,
            questionRightCompile,
            questionEmotionCompile,
            questionIntentionCompile,
            editQuestionQuery,
            searchQuestion,
            searchQuestionEdit,
            searchQuestionDelete,
            searchKnowledge,
            authorityManagement,
            lexiconMaintain,
            sensitivePage,
            sensitivePageAdd,
            sensitivePageEdit,
            sensitivePageDelete,
            sensitivePageLead,
            synonymPage,
            synonymPageAdd,
            synonymPageEdit,
            synonymPageDelete,
            synonymPageLead,
            thesaurusPage,
            thesaurusPageAdd,
            thesaurusPageEdit,
            thesaurusPageDelete,
            thesaurusPageLead,
            manageKnowledge,
            informActivityProductAdd,
            informActivityProductDelete,
            informActivityProductEdit,
            multiLanguageAdd,
            multiLanguageEdit,
            multiLanguageDelete,
            ebayLabelPage,
            ebayLabelPageMark,
            ebayLabelPageEdit,
            productCommentPage,
            productCommentAdd,
            productCommentEdit,
            productInfoPage,
            productInfoAdd,
            productInfoEdit,
            QAedit,
            Monitoring,
            nlpBaseManage,
            translateLabel,
            translateLabelAdd,
            translateLabelEdit,
            onLineTranslateLabel,
            onLineTranslateLabelAdd,
            onLineTranslateLabelEdit,
            queryRewrite,
            queryRewriteAdd,
            queryRewriteToleadAdd,
            queryRewriteEdit,
            queryRewriteAudit
        };
    },

    //获取时间框时间
    getTimes(value) {
        let [startDate, endDate] = ['', ''];
        if (value.length > 0) {
            const [startTime, endTime] = value;
            [startDate, endDate] = [
                `${startTime.format('YYYY-MM-DD')} 00:00:00`,
                `${endTime.format('YYYY-MM-DD')} 23:59:59`
            ];
        }

        startDate = moment(startDate)
            .utc()
            .format('YYYY-MM-DD HH:mm:ss');
        endDate = moment(endDate)
            .utc()
            .format('YYYY-MM-DD HH:mm:ss');
        return { startDate, endDate };
    },
    getMomentTimes(value) {
        let [startDate, endDate] = ['', ''];
        if (value.length > 0) {
            const [startTime, endTime] = value;
            [startDate, endDate] = [
                `${startTime.format('YYYY-MM-DD')} 00:00:00`,
                `${endTime.format('YYYY-MM-DD')} 23:59:59`
            ];
        }
        return { startDate, endDate };
    },

    getSpecial(value) {
        const regEn = /^[`~!#$%^&*()_+<>?:"{},./;'[\]]+$/im,
            regCn = /^[·！#￥（——）：；“”‘、，|《。》？、【】[\]]+$/im;
        if (regEn.test(value) || regCn.test(value)) {
            message.error('名称不能是纯特殊字符.');
            return;
        }
        return;
    },

    // 将目标时区的时间转化为本地时间
    converToLocal(targetZone, targetTime) {
        var timestamp = Date.parse(
            moment(targetTime)
                .format()
                .slice(0, 19) + targetZone
        );

        return moment(timestamp);
    }
};

export default common;
