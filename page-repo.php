<?php
/*
Template Name: Project Repo
Template Post Type: post, page, event
*/
?>

<?php
get_header();

if (!session_id()) {
    session_start();
}

if (isset($_POST["lang"])) {
    $_SESSION["user_sel_lang"] = $_POST["lang"];
} else {
    session_destroy();
}

$filePath = isset($_SESSION["user_sel_lang"])
    ? $_SESSION["user_sel_lang"]
    : "en";

if ($filePath === "eufunded") {
    $filePath = "en";
}

require "lang/" . $filePath . ".php";
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">


<div class="col-md-4">
</div>



<?php if (empty($_SESSION["user_sel_lang"])) { ?>
<div class="" style="
    padding: 0 30px;
">
  <h1
    style="margin-top:25px !important;margin-bottom:15px !important;font-size: 25px;color: #144280;text-transform: uppercase;letter-spacing: -.7px;font-weight: bold;">
    Web-based open-access knowledge resource of digital trackers <span style="
    font-size: 16px;
    color: #eb6e27;
">(CSI-COP Repository).</span></h1>
</div>

<?php } ?>

<div data-cy="box" class="sc-ipEyDJ eSvKbG snipcss-pJ5no">
  <div class="sc-ehkVkK jNqSsL">

    <div data-cy="flex-item" order="unset" class="sc-gYbzsP izdnBr">
      <?php if (empty($_SESSION["user_sel_lang"])) { ?>
      <div style="display:flex;justify-content:center;">
        <div class="col-md-4">
          <form id="csi_repo_form" method="post" action="">
            <div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf">
              <label for="floatingInput" style="color: #fff;">Select Langugage</label>
              <select class="custom-select" name="lang" id="select_lang" onchange="onSelectChange();">
                <option value="">Choose Language</option>
                <option value="en" <?php if (
                    $_SESSION["user_sel_lang"] === "en"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  English</option>
                <option value="gre" <?php if (
                    $_SESSION["user_sel_lang"] === "gre"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Greek</option>
                <option value="cz" <?php if (
                    $_SESSION["user_sel_lang"] === "cz"
                ) {
                    echo ' selected="selected"';
                } ?>>Czech
                </option>
                <option value="he" <?php if (
                    $_SESSION["user_sel_lang"] === "he"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Hebrew</option>
                <option value="ro" <?php if (
                    $_SESSION["user_sel_lang"] === "ro"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Romanian</option>
                <option value="fi" <?php if (
                    $_SESSION["user_sel_lang"] === "fi"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Finnish</option>
                <option value="hu" <?php if (
                    $_SESSION["user_sel_lang"] === "hu"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Hungarian</option>
                <option value="es" <?php if (
                    $_SESSION["user_sel_lang"] === "es"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Spanish</option>
                <option value="pl" <?php if (
                    $_SESSION["user_sel_lang"] === "pl"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Polish</option>
                <option value="it" <?php if (
                    $_SESSION["user_sel_lang"] === "it"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  Italian</option>
                <option value="de" <?php if (
                    $_SESSION["user_sel_lang"] === "de"
                ) {
                    echo ' selected="selected"';
                } ?>>
                  German</option>

              </select>
            </div>

          </form>
        </div>

        <div class="col-md-4">
          <div style="display: flex;">
            <div style="padding-top:40px">
              <label style="color: #fff;">(OR)</label>
            </div>
            <div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf"
              style="padding:1.9rem 1.75rem .375rem .75rem;">
              <form id="csi_repo_eu_form" method="post" action="">
                <input type="hidden" name="lang" value="eufunded" />
                <a href="#" class="btn btn-success" role="button" onclick="onEUFundSubmit()">Check EU Funded Project
                  Websites</a>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:21px;">
        <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">
          Help on How to Use Repository
        </button>
      </div>
      <!-- Collapsible content -->
      <div class="collapse" id="collapseExample">
        <div class="card card-body mt-2 px-4">
          To start using the repository, choose a language first from the available languages in the list. Then you can
          select 'Find All' on 'Apps' or 'Websites'.<br> Also, you can click on "Check EU funded project websites" to
          view the investigations on EU funded project websites.<br>
          <br>
          <p style="display: inline;">Here you can <a
              href="https://csi-cop.eu/wp-content/uploads/2023/09/CSI-COP-Repository-Manual-Deliverable_D5.2-D19.pdf"
              target="_blank" style="display: inline;">download</a> a short manual on how to use CSI-COP Repository
            created by the project's sub-contractor, Mr Venkatesh Nanneboina, software engineer from Xcel Resources.</p>


          <ul style="
    padding-left: 18px;
    letter-spacing: -.3px;
    line-height: 1.4;
    margin-top: 15px;
">

            <li>Please note, sometimes an investigation of a website, or an app, can be in dual languages, such as in
              English and the language selected (e.g. Greek). For example, there is an investigation of a school
              conducted in Greek, the school name is Patras Second Chance School. This investigation will be retrieved
              on searching for it in the Greek language. There could be other exceptions like this. Try 'Find All' when
              searching to retrieve all the investigations in a language.</li>

            <li> Please note, sometimes an image will not appear alongside an investigation, because the image label is
              not accurate according to an website or app name. This is part of Partner data-cleaning to the end of the
              project, in August 2023.</li>
          </ul>
        </div>
      </div>

      <?php } ?>



      <?php if (
          !empty($_SESSION["user_sel_lang"]) &&
          $_SESSION["user_sel_lang"] !== "eufunded"
      ) { ?>
      <div class="sc-iuuDEZ gEunvO">

        <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false"
          class="react-autosuggest__container">
          <div class="sc-ciEjBl lcdmkh">
            <div class="sc-ifSILs cRQBHe">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 32 32" width="1em" height="100%"
                data-cy="icon" color="#2A3B4F" cursor="initial" font-size="16" pointer-events="none">
                <path
                  d="M30 28.59 22.45 21A11 11 0 1 0 21 22.45L28.59 30 30 28.59zM5 14a9 9 0 1 1 18 0 9 9 0 0 1-18 0z">
                </path>
              </svg>
            </div>
            <input type="text" autocomplete="off" id="csi_search_box" class="sc-IQBGL eMYNWK react-autosuggest__input"
              placeholder="<?php echo $lang["search_box_placeholder"]; ?>">
          </div>
          <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container">
          </div>
        </div>
      </div>
    </div>
    <div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf">

      <select class="custom-select" id="type_of_search">
        <option value="app"><?php echo $lang["label_app"]; ?></option>
        <option value="website"><?php echo $lang["label_website"]; ?></option>
      </select>
    </div>

    <a href="#" class="btn btn-info repo_find_all" role="button">Find All</a>
    <a href="<?php $_SERVER[
        "PHP_SELF"
    ]; ?>" class="btn btn-danger" role="button">Change Language</a>
    <a href="<?php $_SERVER[
        "PHP_SELF"
    ]; ?>" class="btn btn-success" role="button">Go to Home</a>
    <?php } elseif (
          !empty($_SESSION["user_sel_lang"]) &&
          $_SESSION["user_sel_lang"] === "eufunded"
      ) { ?>

    <div class="sc-iuuDEZ gEunvO">

      <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false"
        class="react-autosuggest__container">
        <div class="sc-ciEjBl lcdmkh">
          <div class="sc-ifSILs cRQBHe">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 32 32" width="1em" height="100%"
              data-cy="icon" color="#2A3B4F" cursor="initial" font-size="16" pointer-events="none">
              <path d="M30 28.59 22.45 21A11 11 0 1 0 21 22.45L28.59 30 30 28.59zM5 14a9 9 0 1 1 18 0 9 9 0 0 1-18 0z">
              </path>
            </svg>
          </div>
          <input type="text" autocomplete="off" id="csi_search_box" class="sc-IQBGL eMYNWK react-autosuggest__input"
            placeholder="<?php echo $lang["search_box_placeholder"]; ?>">
        </div>
        <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container">
        </div>
      </div>
    </div>
  </div>
  <div data-cy="flex-item" order="unset" class="sc-gYbzsP fNjzQf">
    <select class="custom-select" id="type_of_search">
      <option value="website" selected><?php echo $lang[
          "label_website"
      ]; ?></option>
    </select>
  </div>

  <a href="#" class="btn btn-info repo_find_all" role="button">Find All</a>
  <a href="<?php $_SERVER[
      "PHP_SELF"
  ]; ?>" class="btn btn-danger" role="button">Go to Home</a>
  <?php } ?>
  <input type="hidden" id="user_sel_lang" value="<?php echo $_SESSION[
      "user_sel_lang"
  ]; ?>" />
  <input type="hidden" id="find_all_click" />


</div>

<div class="sc-dkrFOg jQOlMr">
</div>
</div>
</div>
<?php if (!empty($_SESSION["user_sel_lang"])) { ?>
<div style="display:block;background-color: rgb(230, 239, 253);" class="app_filters">
  <div data-cy="box" class="sc-a4f604af-0 fHPwEN" style="padding:15px;">
    <div data-cy="flexbox" overflow="visible" class="sc-7d70a9bd-0 hILnWU">

      <div data-cy="box" class="sc-a4f604af-0 eNipWR">
        <label>Categories</label>
        <select class="form-control" id="app_filter_type_of_categories">
          <option value="">Type of Categories</option>
          <option value="banking">Banking</option>
          <option value="communication">Communication</option>
          <option value="ecommerce">E-commerce</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="food">Food</option>
          <option value="food delivery">Food Delivery</option>
          <option value="games">Games</option>
          <option value="government">Government</option>
          <option value="health">Health</option>
          <option value="news">News</option>
          <option value="rental">Rental</option>
          <option value="social media">Social Media</option>
          <option value="software">Software</option>
          <option value="transport">Transport</option>
          <option value="travel">Travel</option>
          <option value="utilities">Utilities</option>

        </select>
      </div>
      <div data-cy="box" class="sc-a4f604af-0 eNipWR">
        <label class="form-label">Permissions</label>
        <select class="form-control" id="app_filter_type_of_permissions">
          <option value="">Type of Permissions</option>
          <option value="bluetooth">Bluetooth</option>
          <option value="calendar">Calendar</option>
          <option value="camera">Camera</option>
          <option value="contacts">Contacts</option>
          <option value="identity">Identity</option>
          <option value="microphone">Microphone</option>
          <option value="NFC">NFC</option>
          <option value="phone">Phone</option>
          <option value="Photos/Media/Files">Photos/Media/Files</option>
          <option value="storage">Storage</option>
          <option value="Wi-Fi">Wi-Fi</option>

        </select>
      </div>
      <div data-cy="box" class="sc-a4f604af-0 eNipWR">
        <label class="form-label">OS</label>
        <select class="form-control" id="app_filter_type_of_os">
          <option value="">Type of OS</option>
          <option value="android">Android</option>
          <option value="apple">Apple</option>

        </select>
      </div>
    </div>
  </div>
</div>

<div class="web_filters" style="display:none;">
  <div style="display:block;background-color: rgb(230, 239, 253);">
    <div data-cy="box" class="sc-a4f604af-0 fHPwEN" style="padding:15px;">
      <div data-cy="flexbox" overflow="visible" class="sc-7d70a9bd-0 hILnWU">
        <div data-cy="box" class="sc-a4f604af-0 eNipWR">
          <label class="form-label">Website</label>
          <?php if ($_SESSION["user_sel_lang"] !== "eufunded") { ?>
          <select class="form-control" id="web_filter_type_of_website">
            <option selected>Type of Website</option>
            <option value="art">Art</option>
            <option value="banking">Banking</option>
            <option value="booking">Booking</option>
            <option value="cultural">Cultural</option>
            <option value="delivery">Delivery</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="finance">Finance</option>
            <option value="food">Food</option>
            <option value="games">Games</option>
            <option value="learning">Learning</option>
            <option value="music">Music</option>
            <option value="news">News</option>
            <option value="shopping">Shopping</option>
            <option value="social">Social</option>
            <option value="software">Software</option>
            <option value="sports">Sports</option>
            <option value="transport">Transport</option>
            <option value="travel">Travel</option>

          </select>
          <?php } elseif ($_SESSION["user_sel_lang"] === "eufunded") { ?>
          <select class="form-control" id="web_filter_type_of_website">
            <option selected>Type of Website</option>
            <option value="education">Education</option>
            <option value="news">News</option>
            <option value="research">Research</option>
            <option value="research & innovation">Research and Innovation</option>
            <option value="sharing">Sharing</option>

          </select>
          <?php } ?>
        </div>
        <div data-cy="box" class="sc-a4f604af-0 eNipWR">
          <label class="form-label">Cookie Policy</label>
          <select class="form-control" id="web_filter_cookie_policy">
            <option value="">Cookie Policy Present</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div data-cy="box" class="sc-a4f604af-0 eNipWR">
          <label class="form-label">Privacy Policy</label>
          <select class="form-control" id="web_filter_privacy_policy">
            <option selected>Privacy Policy Present</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div data-cy="box" class="sc-a4f604af-0 eNipWR">
          <label class="form-label">Online Tool Used</label>
          <select class="form-control" id="web_filter_online_tool">
            <option selected>Online Tool Used</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

      </div>

    </div>
  </div>
</div>

<?php } ?>

</div>
<?php if (empty($_SESSION["user_sel_lang"])) { ?>
<div class="col-md-12" style="display:flex;margin-top:30px">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="wordcloud">Trackers in Apps</h4>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/custom_images/wordcloud.svg" style="max-width: 100%;" />
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="wordcloud">Permissions in Apps</h4>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/custom_images/wordcloud_2.svg" style="max-width: 100%;" />
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="wordcloud">Categories in Apps</h4>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/custom_images/wordcloud_3.svg" style="max-width: 100%;" />
      </div>
    </div>
  </div>
</div>
<div class="col-md-12" style="display:flex;margin-top:30px">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="wordcloud">Trackers in Websites</h4>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/custom_images/wowweb.png" style="max-width: 100%;" />
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h4 class="wordcloud">Categories in Websites</h4>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/custom_images/wordcloud_webtype.svg"
          style="max-width: 100%;" />
      </div>
    </div>
  </div>

</div>
<?php } ?>

<div class="sc-jsTgWu cxJPxw snipcss0-0-0-1 snipcss-Lyyee">
  <div data-cy="flexbox" overflow="visible" class="sc-bcXHqe kLPWHt snipcss0-1-1-2">
    <div data-cy="flex-item" order="unset" class="sc-gYbzsP kfDyVW snipcss0-2-2-3">
      <span data-cy="text" font-size="14px" font-weight="700" class="sc-hLBbgP jjLmdk snipcss0-3-3-4">
        <span data-cy="search-showing-results-counter" class="snipcss0-4-4-5 search-results-counter">
          <!-- 2687 -->
        </span>
        <!-- results for -->
        <span data-cy="query-text" class="snipcss0-4-4-6">
          <!-- "amazon" -->
        </span>
      </span>
    </div>

  </div>
  <div class="sc-gswNZR gHyNUk snipcss0-1-1-18">
  </div>

  <div data-cy="box" class="sc-ipEyDJ bDWrjm snipcss0-1-1-19">
    <div class="results-spinner">

    </div>

    <div data-cy="gridRow" overflow="visible"
      class="sc-bcXHqe repo_data_result dpObHp sc-elAWhN dBwbML snipcss0-2-19-20">
      <div style="padding-top: 32px;" class="snipcss0-2-19-921">
      </div>
    </div>
  </div>


  <input type="hidden" class="blogUrl" value="<?php echo get_stylesheet_directory_uri(); ?>" />
  <!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><?php echo $lang[
              "label_insights"
          ]; ?></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body ">

          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-apphome-tab" data-toggle="tab" href="#nav-apphome" role="tab"
                aria-controls="nav-home" aria-selected="true">Info</a>
              <a class="nav-item nav-link" id="nav-appimages-tab" data-toggle="tab" href="#nav-appimages" role="tab"
                aria-controls="nav-images" aria-selected="false">Images</a>

            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-apphome" role="tabpanel" aria-labelledby="nav-apphome-tab"
              style="margin-top:25px;">

              <h6><?php echo $lang["label_app_permissions"]; ?></h6>
              <div class="insights_data">

              </div>
              <div class="clear both"></div>
              <h6><?php echo $lang["label_tracker_names"]; ?></h6>
              <div class="tracker_names">

              </div>
              <div class="clear both"></div>
              <h6><?php echo $lang["label_validation_links"]; ?></h6>
              <div class="validation_links">

              </div>
              <h6></h6>
            </div>

            <div class="tab-pane fade" id="nav-appimages" role="tabpanel" aria-labelledby="nav-appimages-tab">
              <div class="d-flex justify-content-center p-3">
                <div class="col-6">
                  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators app_carousel_indicator">
                    </ol>
                    <div class="carousel-inner app_carousel_images">
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-dismiss="modal"><?php echo $lang["label_close"]; ?></button>

        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bd-example-modal-lg" id="websiteModal" tabindex="-1" role="dialog"
    aria-labelledby="websiteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="websiteModalLabel"><?php echo $lang[
              "label_insights"
          ]; ?></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body ">

          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                aria-controls="nav-home" aria-selected="true">Info</a>
              <a class="nav-item nav-link" id="nav-images-tab" data-toggle="tab" href="#nav-images" role="tab"
                aria-controls="nav-images" aria-selected="false">Images</a>

            </div>
          </nav>

          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

              <div class="website_data">

              </div>
              <table class="table table-striped">
                <thead>
                  <tr>

                    <th scope="col"><?php echo $lang["label_name"]; ?></th>
                    <th scope="col"><?php echo $lang["label_info"]; ?></th>

                  </tr>
                </thead>
                <tbody class="website_cookies_data_display">
                </tbody>
              </table>

              <h5 style="text-transform: capitalize !important;"><?php echo $lang[
                  "name_of_third_party_cookies"
              ]; ?></h5>
              <div class="third_party_cookie_names">

              </div>
            </div>
            <div class="tab-pane fade" id="nav-images" role="tabpanel" aria-labelledby="nav-images-tab">

              <div class="d-flex justify-content-center p-3">
                <div class="col-8">
                  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators website_carousel_indicators">

                    </ol>
                    <div class="carousel-inner website_carousel_images">


                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>


            </div>
          </div>



          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal"><?php echo $lang["label_close"]; ?></button>

          </div>
        </div>
      </div>
    </div>

    <?php get_footer(); ?>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>

    <script>
      function onSelectChange() {
        document.getElementById('csi_repo_form').submit();
      }

      function onEUFundSubmit() {
        document.getElementById('csi_repo_eu_form').submit();
      }
    </script>
    <style>
      .carousel .item {
        height: 200px;
      }

      .item img {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 200px;
      }
    </style>