jQuery(document).ready(function () {

    if( jQuery('#type_of_search').val() === 'website') {
        jQuery('.web_filters').show();
        jQuery('.app_filters').hide();
    }
    else{
        jQuery('.web_filters').hide();
    }

    jQuery('#type_of_search').on('change', function () {

        let val = jQuery(this).val();

        if (val === "app") {
            jQuery('.web_filters').hide();
            jQuery('.app_filters').show();
        } else {
            jQuery('.web_filters').show();
            jQuery('.app_filters').hide();
        }
    });




    jQuery(document).on('click', '.show_app_data', function () {
        jQuery.ajax({
            url: MyAjax.ajaxurl,
            data: {
                action: 'my_action',
                security: MyAjax.security,
                insights_id: jQuery(this).data('appid'),
                type_of_search: jQuery('#type_of_search').val(),
                sel_lang: jQuery('#user_sel_lang').val()
            },
            type: 'post',
            dataType: 'json',
            success: function (response) {
                let app_permissions = response?.app_permissions.split(",");
                let tracker_names = response?.tracker_names.split(",");
                let validation_links = response?.validation_links.split(" ");
                let appImages = response.images;
                jQuery('.insights_data').empty();
                jQuery('.app_carousel_indicator').empty();
                jQuery('.app_carousel_images').empty();
                jQuery('.validation_links').empty();
                jQuery('.tracker_names').empty();

                if(app_permissions?.length) {
                    jQuery.map(app_permissions, function (i, k) {
                        let app_html = '<span class="badge badge-pill badge-dark" style="margin-left:3px;">' + i + '</span>';
                        jQuery('.insights_data').append(app_html);
                    });
                }
                else{
                    jQuery('.insights_data').append('<p style="color:grey">Data not provided in investigation</p>');
                }
                

                jQuery.map(tracker_names, function (i, k) {
                    let tracker_html = '<div><span class="badge badge-pill badge-info" style="white-space:normal;">' + i + '</span></div>';
                    jQuery('.tracker_names').append(tracker_html);
                });

                jQuery.map(validation_links, function (i, k) {
                    let validation_links_html = '<a class="badge" href="' + i + '" target="_blank">' + i + '</a>';
                    jQuery('.validation_links').append(validation_links_html);
                });

                let blogUrl = jQuery('.blogUrl').val();

                if(appImages && appImages.length === 0) {
                    jQuery('.app_carousel_images').append('<h6>No Images Found</h6>');
                }

                jQuery.map(appImages, function (i, k) {

                    let validationImages = '<li data-target="#carouselExampleIndicators" data-slide-to="' + k + '"></li>'

                    jQuery('.app_carousel_indicator').append(validationImages);
                    let imagesInfo = '<div class="carousel-item active">' +
                        '<img class="d-block w-100" src="' + blogUrl + "/custom_images/Apps/" + i + '" alt="First slide"></div>';

                    jQuery('.app_carousel_images').append(imagesInfo);


                })
            }
        });
        jQuery('#exampleModal').modal('show');
    });

    jQuery(document).on('click', '.website_cookies_data', function () {

        jQuery.ajax({
            url: MyAjax.ajaxurl,
            data: {
                action: 'my_action',
                security: MyAjax.security,
                insights_id: jQuery(this).data('appid'),
                type_of_search: jQuery('#type_of_search').val(),
                sel_lang: jQuery('#user_sel_lang').val()
            },
            type: 'post',
            dataType: 'json',
            success: function (response) {

                let third_party_names = response.name_of_online_tool_third_party_cookies?.split(",");

                let sel_user_lang = jQuery('#user_sel_lang').val();

                let webImages = response.images;
                jQuery('.website_cookies_data_display').empty();
                jQuery('.website_carousel_indicators').empty();
                jQuery('.website_carousel_images').empty();
                jQuery('.third_party_cookie_names').empty();

                let privacy_policy = response.privacy_policy_present;
                let cookie_policy = response.cookie_policy_present;
                let online_tool = response.online_tool;

                let html_data =  '<tr><td>' + languageData[sel_user_lang].website_name + '</td><td>' + response.website_name + '</td></tr>' +
                '<tr><td>' + languageData[sel_user_lang].date_of_visit + '</td><td>' + response.date_of_website_visit + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].first_party_cookies + '</td><td>' + response.first_party_cookies + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].total_third_party_cookies + '</td><td>' + response.third_party_cookies + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].third_party_requests + '</td><td>' + response.third_party_requests + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].cookie_policy_present + '</td><td>' + cookie_policy + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].privacy_policy_present + '</td><td>' + privacy_policy + '</td></tr>' +
                    '<tr><td>' + languageData[sel_user_lang].online_app_tool_used + '</td><td>' + online_tool + '</td></tr>';


                jQuery.map(third_party_names, function (i, k) {
                    let tracker_html = '<span class="badge badge-pill badge-info">' + i + '</span>';
                    jQuery('.third_party_cookie_names').append(tracker_html);
                });

                jQuery('.website_cookies_data_display').append(html_data);

                let blogUrl = jQuery('.blogUrl').val();

                jQuery.map(webImages, function (i, k) {

                    let validationImages = '<li data-target="#carouselExampleIndicators" data-slide-to="' + k + '"></li>'

                    jQuery('.website_carousel_indicators').append(validationImages);
                    let imagesInfo = '<div class="carousel-item active">' +
                        '<img class="d-block w-100" src="' + blogUrl + "/custom_images/Websites/" + i + '" alt="First slide"></div>';

                    jQuery('.website_carousel_images').append(imagesInfo);


                })
            }
        });
        jQuery('#websiteModal').modal('show');
    });


    // Find all
    jQuery(".repo_find_all").on('click', function () {
        jQuery('#find_all_click').val(true);
        jQuery.ajax({
            url: MyAjax.ajaxurl,
            data: {
                action: 'my_action',
                security: MyAjax.security,
                value: '',
                type_of_search: jQuery('#type_of_search').val(),
                sel_lang: jQuery('#user_sel_lang').val(),
                findAll: true
            },
            type: 'post',
            dataType: 'json',
            success: function (response) {
                if (response.data.length === 0) {
                    jQuery(".repo_data_result").empty();
                    jQuery(".search-results-counter").html("");
                    let html_result = '<h4>No Results Found. <br/><br/>Please note this repository will retrieve investigations of websites and apps conducted by CSI-COP citizen scientists and team members.'+
                    'It does not include the entirety of websites and apps. If a zero-results is presented, please select the option for "Find All" for the chosen language.'+
                    'That will present all investigations done in that language.</h4>';

                    jQuery(".repo_data_result").append(html_result);

                }

                if (response.data.length > 0) {
                    jQuery(".repo_data_result").empty();
                    jQuery(".search-results-counter").html(response.totalRows+ " results found")
                    if (jQuery('#type_of_search').val() === "app") {
                        jQuery.map(response.data, function (i, k) {

                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="show_app_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.app_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_os + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.type_of_app + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_reviewed + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-14-52-53 snipcss0-11-41-42"> </div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';


                            jQuery(".repo_data_result").append(html_result);

                        });
                    }
                    if (jQuery('#type_of_search').val() === "website") {

                        jQuery.map(response.data, function (i, k) {

                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="website_cookies_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.website_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_website + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.website_link + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_of_website_visit + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-14-52-53 snipcss0-11-41-42"> </div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';


                            jQuery(".repo_data_result").append(html_result);

                        });
                    }
                } // End of Response
            } // End Of Success

        });
    });

    var page = 1;
    // infinteLoadMore(page);
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() + jQuery(window).height() >= jQuery(document).height()) {
            page++;
            infinteLoadMore(page);
        }
    });

    function infinteLoadMore(page) {

        jQuery.ajax({
            url: MyAjax.ajaxurl,
            data: {
                action: 'my_action',
                security: MyAjax.security,
                value: this.value,
                type_of_search: jQuery('#type_of_search').val(),
                sel_lang: jQuery('#user_sel_lang').val(),
                page: page,
                findAll: jQuery('#find_all_click').val()
            },
            type: 'post',
            dataType: 'json',
            success: function (response) {                
                if (response.data !== null && response.data.length === 0) {
                    jQuery(".repo_data_result").empty();
                    jQuery(".search-results-counter").html("");
                    let html_result = '<h4>No Results Found. <br/><br/>Please note this repository will retrieve investigations of websites and apps conducted by CSI-COP citizen scientists and team members.'+
                    'It does not include the entirety of websites and apps. If a zero-results is presented, please select the option for "Find All" for the chosen language.'+
                    'That will present all investigations done in that language.</h4>';
                    jQuery(".repo_data_result").append(html_result);

                }

                if (response.data.length > 0) {

                    jQuery(".repo_data_result").empty();

                    if (jQuery('#type_of_search').val() === "app") {

                        jQuery.map(response.data, function (i, k) {
                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="show_app_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.app_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_os + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.type_of_app + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_reviewed + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41">  <div data-cy="box" class="sc-ipEyDJ esLEiJ snipcss0-16-61-64 snipcss0-13-50-53">  </div></div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';


                            jQuery(".repo_data_result").append(html_result);

                        });
                    }

                    if (jQuery('#type_of_search').val() === "website") {

                        jQuery.map(response.data, function (i, k) {

                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="website_cookies_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.website_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_website + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.website_link + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_of_website_visit + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-14-52-53 snipcss0-11-41-42"> </div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';

                            jQuery(".repo_data_result").append(html_result);

                        });
                    }
                }
            }
        });
    }

    var app_filter_type_of_os;
    var app_filter_type_of_categories;
    var app_filter_type_of_permissions;
    var web_filter_type_of_website;
    var web_filter_cookie_policy;
    var web_filter_privacy_policy;
    var web_filter_online_tool;

    jQuery(document).on('change', '#app_filter_type_of_os', function () {
        app_filter_type_of_os = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    jQuery(document).on('change', '#app_filter_type_of_categories', function () {
        app_filter_type_of_categories = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    jQuery(document).on('change', '#app_filter_type_of_permissions', function () {
        app_filter_type_of_permissions = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    // Web Filters On Change

    jQuery(document).on('change', '#web_filter_type_of_website', function () {
        web_filter_type_of_website = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    jQuery(document).on('change', '#web_filter_cookie_policy', function () {
        web_filter_cookie_policy = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    jQuery(document).on('change', '#web_filter_privacy_policy', function () {
        web_filter_privacy_policy = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });

    jQuery(document).on('change', '#web_filter_online_tool', function () {
        web_filter_online_tool = jQuery(this).val();
        fetchData(jQuery("#csi_search_box").val());
    });



    //on Key Search

    jQuery("#csi_search_box").keyup(function () {

        if (this.value.length < 3) return;

        let searchVal = this.value;
        fetchData(searchVal);
    })



    function fetchData(searchVal) {

        let app_filters = {
            "type_of_os": app_filter_type_of_os,
            "category" : app_filter_type_of_categories,
            "permission" : app_filter_type_of_permissions
        }

        let web_filters = {
            "type_of_website" : web_filter_type_of_website,
            "cookie_policy" : web_filter_cookie_policy,
            "privacy_policy" : web_filter_privacy_policy,
            "online_tool" : web_filter_online_tool
        }

        jQuery.ajax({
            url: MyAjax.ajaxurl,
            data: {
                action: 'my_action',
                security: MyAjax.security,
                value: searchVal,
                type_of_search: jQuery('#type_of_search').val(),
                sel_lang: jQuery('#user_sel_lang').val(),
                appFilters: app_filters,
                webFilters:web_filters
            },
            type: 'post',
            dataType: 'json',
            beforeSend : function() {
                
                jQuery('.results-spinner').html('<div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div>')
            },
            complete: function() {
               
                jQuery('.results-spinner').html("");
            },
            success: function (response) {

                jQuery('.results-spinner').html("");

                if (response.data.length === 0) {
                    jQuery(".repo_data_result").empty();
                    jQuery(".search-results-counter").html("");
                    let html_result = '<h4>No Results Found. <br/><br/>Please note this repository will retrieve investigations of websites and apps conducted by CSI-COP citizen scientists and team members.'+
                    'It does not include the entirety of websites and apps. If a zero-results is presented, please select the option for "Find All" for the chosen language.'+
                    'That will present all investigations done in that language.</h4>';
                    jQuery(".repo_data_result").append(html_result);

                }

                

                if (response.data.length > 0) {
                    jQuery(".repo_data_result").empty();

                    jQuery(".search-results-counter").html(response.filteredRows+" results found out of "+response.totalRows+" records");

                    if (jQuery('#type_of_search').val() === "app") {
                        jQuery.map(response.data, function (i, k) {

                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="show_app_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.app_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_os + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.type_of_app + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_reviewed + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-14-52-53 snipcss0-11-41-42">  <div data-cy="box" class="sc-ipEyDJ esLEiJ snipcss0-16-61-64 snipcss0-13-50-53">  </div></div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';


                            jQuery(".repo_data_result").append(html_result);

                        });
                    }
                    if (jQuery('#type_of_search').val() === "website") {

                        jQuery.map(response.data, function (i, k) {

                            let html_result = ' <div data-cy="GridCol" order="unset" class="sc-gYbzsP kfDyVW sc-kiPvrU jFpBdQ snipcss0-3-20-21 snipcss0-0-0-1 tether-target-attached-top tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">' +
                                '<div class="sc-cxdZMj iUliMv"> <span class="sc-dmctIk eDQUpO sc-grxQYx hqKJhi"> <a class="website_cookies_data sc-dIfARi huHlMl sc-hHTYSt daeMdH snipcss0-6-23-24 snipcss0-3-4-5" data-appid=' + i.id + ' > ' +
                                '<div data-cy="entity-card-lp-7446" class="sc-ehvNnt frPYEz"> ' +
                                '<div data-cy="section-content" spacing="0px" class="sc-laZRCg ddOdc"> ' +
                                ' <div class="sc-knEsKG fNHSBQ" height="275"> ' +
                                '<div class="sc-hZNxer kKxlFr snipcss0-10-27-28 snipcss0-7-8-9"> ' +
                                ' <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 40 40" width="1em" height="100%" data-cy="icon" color="#886CFF" cursor="initial" font-size="32" pointer-events="none" class="snipcss0-11-28-29 snipcss0-8-9-10"> <path fill-rule="evenodd" d="M8 0a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8zm12.945 7.56a1.05 1.05 0 0 0-.941-.56 1.05 1.05 0 0 0-.946.554l-11.96 23.62a.91.91 0 0 0 .201 1.085c.306.287.772.367 1.169.202l11.513-4.81L31.5 32.9c.395.18.87.11 1.185-.174a.912.912 0 0 0 .219-1.092L20.945 7.56zm-1.373 18.15-9.397 3.925 9.816-19.385 9.8 19.726-9.332-4.253a1.116 1.116 0 0 0-.887-.014z" clip-rule="evenodd"> </path> </svg> ' +
                                '<span data-cy="text" font-size="13px" font-weight="700" letter-spacing="3px" class="sc-hLBbgP hDIQYW snipcss0-11-28-30 snipcss0-8-9-11"> ' + i.website_name + ' </span> ' +
                                '</div><div class="sc-iJbNxu ipOgDi snipcss0-10-27-31 snipcss0-7-8-12"> <div class="sc-iXGltN difa-du snipcss0-11-31-32 snipcss0-8-12-13"> <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr snipcss0-12-32-33 snipcss0-9-13-14"> <div data-cy="box" class="sc-ipEyDJ cUhrpM snipcss0-13-33-34 snipcss0-10-14-15"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hPofFg snipcss0-14-34-35 snipcss0-11-15-16"> <div data-cy="instructor-186" class="sc-jKvnYE fgFsLd snipcss0-15-35-36 snipcss0-12-16-17"> ' +
                                '<span data-cy="text" font-size="14px" font-weight="400" class="sc-hLBbgP eeaapo snipcss0-16-36-39 snipcss0-13-17-20">' + i.type_of_website + '  </span> </div></div></div><div class="sc-bTUVah iEaEGr"> ' +
                                '<span data-cy="text" font-size="16px" font-weight="700" class="sc-hLBbgP iscXSs snipcss0-14-40-41 snipcss0-11-21-22"> ' + i.website_link + ' </span> </div></div><div class="sc-gswNZR gHyNVx snipcss0-12-32-42 snipcss0-9-13-31"> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-12-32-43 snipcss0-9-13-32"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-13-43-44 snipcss0-10-32-33"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-14-44-45 snipcss0-11-33-34"> ' + i.date_of_website_visit + ' </span> <div data-cy="box" class="sc-ipEyDJ OMXWB snipcss0-14-44-46 snipcss0-11-33-35"> <span data-cy="text" font-size="16px" font-weight="400" class="sc-hLBbgP jTGNGH snipcss0-15-46-47 snipcss0-12-35-36"> | </span> </div><div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf snipcss0-14-44-48 snipcss0-11-33-37"> <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP enMLOj snipcss0-15-48-49 snipcss0-12-37-38"> ' + i.language + ' </span> </div></div></div><div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-12-32-50 snipcss0-9-13-39"> <span spacing="0" class="sc-eDWCr cTgBvR snipcss0-13-50-51 snipcss0-10-39-40"> </span> <div data-cy="box" class="sc-ipEyDJ jEktxk snipcss0-13-50-52 snipcss0-10-39-41"> <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe hErVHY snipcss0-14-52-53 snipcss0-11-41-42">  <div data-cy="box" class="sc-ipEyDJ esLEiJ snipcss0-16-61-64 snipcss0-13-50-53">  </div></div></div></div></div></div></div></div></div></div></a> </span> </div></div></div>';


                            jQuery(".repo_data_result").append(html_result);

                        });
                    }
                }
            }
        })
    }







});